from fastapi import FastAPI, APIRouter, Depends, HTTPException
from fastapi.security import APIKeyHeader
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import secrets
import uuid
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

DATE_RE = r"^\d{4}-\d{2}-\d{2}$"


class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class BookingCreate(BaseModel):
    name: Optional[str] = Field(default=None, max_length=80)
    package_name: str = Field(min_length=1, max_length=80)
    car_type: str = Field(min_length=1, max_length=40)
    date: str = Field(pattern=DATE_RE)
    slot: str = Field(min_length=1, max_length=30)
    location: str = Field(min_length=3, max_length=300)
    utilities_available: bool


class Booking(BookingCreate):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    utilities_available: Optional[bool] = None


class BlockedSlotCreate(BaseModel):
    date: str = Field(pattern=DATE_RE)
    slot: Optional[str] = Field(default=None, max_length=30)
    reason: Optional[str] = Field(default=None, max_length=200)


class BlockedSlot(BlockedSlotCreate):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


admin_key_header = APIKeyHeader(name="X-Admin-Key", auto_error=False)


async def require_admin(key: Optional[str] = Depends(admin_key_header)):
    configured = os.environ.get("ADMIN_KEY", "")
    if not key or not configured or not secrets.compare_digest(key.encode(), configured.encode()):
        raise HTTPException(status_code=401, detail="Invalid admin key")


@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


@api_router.post("/bookings", status_code=201)
async def create_booking(input: BookingCreate):
    booking = Booking(**input.model_dump())
    await db.bookings.insert_one(booking.model_dump())
    return {"id": booking.id, "status": "saved"}


@api_router.get("/admin/bookings", response_model=List[Booking], dependencies=[Depends(require_admin)])
async def list_bookings():
    return await db.bookings.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)


@api_router.get("/blocked-slots", response_model=List[BlockedSlot])
async def public_blocked_slots(date: str):
    return await db.blocked_slots.find({"date": date}, {"_id": 0}).to_list(50)


@api_router.get("/admin/blocked-slots", response_model=List[BlockedSlot], dependencies=[Depends(require_admin)])
async def admin_blocked_slots():
    return await db.blocked_slots.find({}, {"_id": 0}).sort("date", 1).to_list(500)


@api_router.post("/admin/blocked-slots", response_model=BlockedSlot, status_code=201, dependencies=[Depends(require_admin)])
async def create_blocked_slot(input: BlockedSlotCreate):
    existing = await db.blocked_slots.find_one({"date": input.date, "slot": input.slot})
    if existing:
        raise HTTPException(status_code=409, detail="That slot is already blocked")
    slot = BlockedSlot(**input.model_dump())
    await db.blocked_slots.insert_one(slot.model_dump())
    return slot


@api_router.delete("/admin/blocked-slots/{slot_id}", status_code=204, dependencies=[Depends(require_admin)])
async def delete_blocked_slot(slot_id: str):
    result = await db.blocked_slots.delete_one({"id": slot_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Blocked slot not found")


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
