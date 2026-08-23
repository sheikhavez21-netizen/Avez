import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const PANJIM = [15.4909, 73.8278];

const ClickHandler = ({ onPin }) => {
  useMapEvents({
    click: (e) => onPin({ lat: e.latlng.lat, lng: e.latlng.lng }),
  });
  return null;
};

const Recenter = ({ pin }) => {
  const map = useMap();
  useEffect(() => {
    if (pin) map.setView([pin.lat, pin.lng], 16);
  }, [pin, map]);
  return null;
};

export const PinMap = ({ pin, onPin }) => (
  <MapContainer
    center={pin ? [pin.lat, pin.lng] : PANJIM}
    zoom={pin ? 16 : 13}
    style={{ height: 260, width: "100%", borderRadius: 16, zIndex: 0 }}
    scrollWheelZoom={false}
  >
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap contributors" />
    <ClickHandler onPin={onPin} />
    <Recenter pin={pin} />
    {pin && (
      <Marker
        position={[pin.lat, pin.lng]}
        draggable
        eventHandlers={{
          dragend: (e) => {
            const p = e.target.getLatLng();
            onPin({ lat: p.lat, lng: p.lng });
          },
        }}
      />
    )}
  </MapContainer>
);
