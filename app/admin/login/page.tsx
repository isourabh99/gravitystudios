"use client";

import React, { useState, useEffect, useTransition } from "react";
import { loginAction } from "@/app/admin/actions";
import GravityLogo from "@/components/logo/GravityLogo";
import ScrambleText from "@/components/ui/ScrambleText";
import CtaButton from "@/components/ui/CtaButton";
import { Lock, Eye, EyeOff, ShieldCheck, Database, Terminal, Clock, Sparkles } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const [localTime, setLocalTime] = useState("");
  const [utcTime, setUtcTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLocalTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
      setUtcTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "UTC",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData();
    formData.append("password", password);
    formData.append("returnUrl", "/admin");

    startTransition(async () => {
      const res = await loginAction(null, formData);
      if (res && !res.success && res.error) {
        setError(res.error);
      }
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#000000] text-[#F4F4F0] flex flex-col lg:flex-row relative overflow-hidden select-none font-sans">
      {/* Background Matrix Grid & Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(#222222_1px,transparent_1px)] [background-size:28px_28px] opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#ED3327]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

      {/* LEFT COLUMN: Cinematic Studio Canvas (55% width) */}
      <div className="lg:w-[55%] flex flex-col justify-between p-8 sm:p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-neutral-900/80 relative z-10">
        {/* Top Brand & Clocks */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <GravityLogo showLink={false} isDark={false} textSize="text-2xl sm:text-3xl" />

          {/* Real-time Studio Clock */}
          <div className="flex items-center gap-4 text-xs font-mono text-neutral-400 bg-neutral-950/80 px-4 py-2 rounded-none border border-neutral-900 w-fit">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-neutral-500" />
              <span className="text-white font-semibold">{localTime || "--:--:--"}</span>
              <span className="text-[10px] text-neutral-500">LOCAL</span>
            </div>
            <div className="h-3 w-px bg-neutral-800" />
            <div>
              <span className="text-neutral-300">{utcTime || "--:--"}</span>
              <span className="text-[10px] text-neutral-500 ml-1">UTC</span>
            </div>
          </div>
        </div>

        {/* Center Editorial Manifesto & Holographic Wireframe */}
        <div className="my-12 lg:my-0 space-y-6 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-[#ED3327]/10 border border-[#ED3327]/25 text-[#ED3327] font-mono text-xs font-semibold tracking-wider">
            <Terminal className="w-3.5 h-3.5" />
            <span>OPERATIONAL STUDIO SYSTEM v2.0</span>
          </div>

          <h1 className="font-mg12-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            <ScrambleText text="The Benchmark of Digital Innovation" hoverColor="#ED3327" />
          </h1>

          <p className="text-xs sm:text-sm font-mono text-neutral-400 leading-relaxed">
            Centralized Command Portal for real-time WebGL telemetry, dynamic Three.js case study deployment, Generative Engine Optimization (GEO), and direct MongoDB database synchronization.
          </p>

          {/* Live Engine Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 font-mono text-xs">
            <div className="p-3 rounded-none bg-neutral-950/90 border border-neutral-900 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 text-[11px]">
                <Database className="w-3.5 h-3.5" />
                <span>DATABASE</span>
              </div>
              <div className="text-white font-bold">MongoDB Atlas</div>
            </div>

            <div className="p-3 rounded-none bg-neutral-950/90 border border-neutral-900 space-y-1">
              <div className="flex items-center gap-1.5 text-blue-400 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>SECURITY</span>
              </div>
              <div className="text-white font-bold">HMAC-SHA256</div>
            </div>

            <div className="p-3 rounded-none bg-neutral-950/90 border border-neutral-900 space-y-1 col-span-2 sm:col-span-1">
              <div className="flex items-center gap-1.5 text-amber-400 text-[11px]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI GEO</span>
              </div>
              <div className="text-white font-bold">llms.txt Active</div>
            </div>
          </div>
        </div>

        {/* Bottom Studio Signature */}
        <div className="flex items-center justify-between text-xs font-mono text-neutral-500 pt-6 border-t border-neutral-900/60">
          <span>GRAVITY STUDIOS // ARCHIVE 2026</span>
          <span className="text-emerald-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-none bg-emerald-400 animate-pulse" />
            SYSTEMS OPTIMAL
          </span>
        </div>
      </div>

      {/* RIGHT COLUMN: Tactical Access Terminal (45% width) */}
      <div className="lg:w-[45%] flex items-center justify-center p-6 sm:p-12 lg:p-16 relative z-10">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <span className="font-mono text-xs tracking-widest text-[#ED3327] uppercase block">
              ACCESS VERIFICATION
            </span>
            <h2 className="font-mg12-bold text-2xl sm:text-3xl text-white tracking-tight">
              Studio Lead Terminal
            </h2>
            <p className="text-xs font-mono text-neutral-400">
              Input studio authorization key to decrypt operational CMS controls.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                <label className="uppercase tracking-wider">Master Security Passcode</label>
                <span className="text-[11px] text-neutral-500">ENCRYPTED</span>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter studio master key..."
                  required
                  autoFocus
                  className="w-full pl-11 pr-12 py-3.5 rounded-none bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 text-sm font-mono focus:outline-none focus:border-[#ED3327] focus:ring-1 focus:ring-[#ED3327] transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral-500 hover:text-white transition-colors cursor-pointer"
                  aria-label="Toggle Password Visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3.5 rounded-none bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs font-mono flex items-center gap-2">
                <span className="text-rose-400 font-bold">!</span>
                <span>{error}</span>
              </div>
            )}

            {/* Custom CtaButton (as used across the website) */}
            <div className="w-full pt-2">
              <CtaButton
                type="submit"
                variant="white"
                shape="square"
                disabled={isPending}
                className="w-full !py-4 text-xs font-mono tracking-widest uppercase font-bold shadow-[0_0_25px_rgba(255,255,255,0.15)]"
              >
                {isPending ? "DECRYPTING KEY..." : "AUTHENTICATE ACCESS →"}
              </CtaButton>
            </div>
          </form>

          {/* Quick Access Helper */}
          <div className="p-4 rounded-none bg-neutral-950/80 border border-neutral-900 text-center space-y-1">
            <span className="text-[11px] font-mono text-neutral-500 block">
              Default studio master key:
            </span>
            <code className="inline-block px-2.5 py-1 rounded-none bg-black text-neutral-300 text-xs font-mono border border-neutral-800">
              gravity2026!
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
