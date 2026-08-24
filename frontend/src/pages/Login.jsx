import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, ShieldCheck, ArrowLeft } from "lucide-react";
import { setSession, setVehicle } from "../utils/auth";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const fieldCls =
  "w-full rounded-xl border border-zinc-200 bg-white px-4 py-3.5 text-base font-semibold text-zinc-900 placeholder:text-zinc-400 placeholder:font-normal focus:outline-none focus:border-[#FF5A00] focus:ring-2 focus:ring-[#FF5A00]/20 transition-colors";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [demoOtp, setDemoOtp] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sendOtp = async () => {
    setError("");
    if (!/^\d{10}$/.test(phone)) return setError("Enter a valid 10-digit mobile number.");
    setLoading(true);
    try {
      const r = await fetch(`${API}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: `+91${phone}` }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.detail || "Couldn't send OTP");
      setDemoOtp(data.demo_otp);
      setStep(2);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  const verify = async () => {
    setError("");
    if (!/^\d{6}$/.test(otp)) return setError("Enter the 6-digit code.");
    setLoading(true);
    try {
      const r = await fetch(`${API}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: `+91${phone}`, otp }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.detail || "Verification failed");
      setSession({ token: data.token, phone: data.phone });
      try {
        const pr = await fetch(`${API}/profile`, { headers: { Authorization: `Bearer ${data.token}` } });
        if (pr.ok) {
          const prof = await pr.json();
          if (prof.make) setVehicle({ make: prof.make, model: prof.model, vehicleType: prof.vehicleType });
        }
      } catch {}
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F4F4F5] flex items-center justify-center px-5" data-testid="login-page">
      <div className="w-full max-w-sm bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm">
        <a href="/" className="inline-block">
          <img src="/assets/relay-logo.png" alt="Relay Premium Car Care" className="h-8 w-auto mb-8" />
        </a>
        <h1 className="font-display text-2xl font-extrabold tracking-tight text-zinc-900">
          {step === 1 ? "Log in with your mobile" : "Enter your code"}
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          {step === 1 ? "We'll send a one-time code over SMS." : `Code sent to +91 ${phone}`}
        </p>
        {step === 1 ? (
          <>
            <div className="mt-6 flex gap-2.5">
              <span className="inline-flex items-center rounded-xl border border-zinc-200 bg-zinc-50 px-4 text-base font-bold text-zinc-700">
                +91
              </span>
              <input
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                onKeyDown={(e) => e.key === "Enter" && sendOtp()}
                placeholder="96659 80103"
                data-testid="login-phone-input"
                className={fieldCls}
              />
            </div>
            {error && <p data-testid="login-error" className="mt-3 text-sm font-semibold text-red-600">{error}</p>}
            <button
              onClick={sendOtp}
              disabled={loading}
              data-testid="login-send-otp-button"
              className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-[#FF5A00] hover:bg-[#E04F00] text-white font-bold rounded-full px-6 py-4 transition-colors active:scale-95 disabled:opacity-60"
            >
              <Phone size={17} />
              {loading ? "Sending…" : "Send OTP"}
            </button>
          </>
        ) : (
          <>
            <div className="mt-6">
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                onKeyDown={(e) => e.key === "Enter" && verify()}
                placeholder="6-digit code"
                data-testid="login-otp-input"
                className={`${fieldCls} text-center text-2xl tracking-[0.5em] font-black`}
              />
            </div>
            <div data-testid="login-demo-otp" className="mt-4 bg-[#FFF0E5] border border-[#FF5A00]/25 rounded-xl px-4 py-3 text-center">
              <p className="text-xs font-bold uppercase tracking-wider text-[#FF5A00]">Demo mode — no SMS sent</p>
              <p className="mt-1 text-sm text-zinc-700">
                Your code is <span className="font-display text-xl font-black text-zinc-900 tracking-widest">{demoOtp}</span>
              </p>
            </div>
            {error && <p data-testid="login-error" className="mt-3 text-sm font-semibold text-red-600">{error}</p>}
            <button
              onClick={verify}
              disabled={loading}
              data-testid="login-verify-button"
              className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-[#FF5A00] hover:bg-[#E04F00] text-white font-bold rounded-full px-6 py-4 transition-colors active:scale-95 disabled:opacity-60"
            >
              <ShieldCheck size={17} />
              {loading ? "Verifying…" : "Verify & Log In"}
            </button>
            <button
              onClick={() => {
                setStep(1);
                setOtp("");
                setError("");
              }}
              data-testid="login-back-button"
              className="mt-3 w-full inline-flex items-center justify-center gap-1.5 text-sm font-bold text-zinc-500 hover:text-[#FF5A00] transition-colors"
            >
              <ArrowLeft size={14} />
              Change number
            </button>
          </>
        )}
      </div>
    </div>
  );
}
