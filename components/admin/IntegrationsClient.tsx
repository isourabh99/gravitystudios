"use client";

import React, { useState, useTransition } from "react";
import {
  Radio,
  Check,
  Activity,
  Layers,
  Code,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import { TrackingSettings } from "@/lib/cms/types";
import { updateTrackingAction } from "@/app/admin/actions";
import CtaButton from "@/components/ui/CtaButton";
import ScrambleText from "@/components/ui/ScrambleText";
import { useAdminTheme } from "@/components/admin/AdminThemeContext";
import { StudioBooleanSwitch } from "@/components/ui/StudioToggle";

interface IntegrationsClientProps {
  initialTracking: TrackingSettings;
  accentColor?: string;
}

export default function IntegrationsClient({
  initialTracking,
  accentColor = "#ED3327",
}: IntegrationsClientProps) {
  const { isLight } = useAdminTheme();
  const [tracking, setTracking] = useState<TrackingSettings>(initialTracking);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const cardCls = isLight
    ? "bg-white border-neutral-200 text-neutral-900 shadow-sm"
    : "bg-[#09090C] border-[#1C1C20] text-white";

  const subCardCls = isLight
    ? "bg-neutral-50/90 border-neutral-200"
    : "bg-neutral-950/70 border-neutral-900";

  const inputCls = isLight
    ? "bg-neutral-50 border-neutral-300 text-neutral-900 focus:bg-white focus:border-black"
    : "bg-[#050506] border-neutral-800 text-white focus:border-[#ED3327]";

  const borderSep = isLight ? "border-neutral-200" : "border-neutral-900";
  const textHeading = isLight ? "text-neutral-900" : "text-white";
  const textSub = isLight ? "text-neutral-500" : "text-neutral-400";

  const handleSave = () => {
    setToastMessage(null);
    startTransition(async () => {
      const res = await updateTrackingAction(tracking);
      if (res.success) {
        setToastMessage("Tracking Hub configuration updated & injected dynamically.");
        setTimeout(() => setToastMessage(null), 4000);
      } else {
        setToastMessage(`Error: ${res.error}`);
      }
    });
  };

  return (
    <div className="space-y-8 select-none">
      {/* Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b ${borderSep}`}>
        <div>
          <h1 className={`text-xl sm:text-2xl font-bold font-mg12-bold tracking-tight ${textHeading}`}>
            <ScrambleText text="Tracking Hub & Third-Party Integrations" hoverColor={accentColor} />
          </h1>
          <p className={`text-xs font-mono mt-1 ${textSub}`}>
            Connect Vercel Analytics, Google Analytics (GA4), Meta Pixel, and header scripts
          </p>
        </div>

        <CtaButton
          onClick={handleSave}
          variant="brand"
          shape="square"
          disabled={isPending}
          className="!py-3 !px-6 text-xs font-mono font-bold self-start sm:self-auto"
        >
          {isPending ? "SAVING..." : "SAVE & SYNC TO MONGODB"}
        </CtaButton>
      </div>

      {toastMessage && (
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-neutral-400 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* Grid of Trackers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. VERCEL ANALYTICS */}
        <div className={`p-6 rounded-2xl border space-y-4 ${cardCls}`}>
          <div className={`flex items-center justify-between pb-3 border-b ${borderSep}`}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                ▲
              </div>
              <div>
                <h3 className={`text-sm font-bold font-mg12-bold ${textHeading}`}>
                  Vercel Web Analytics
                </h3>
                <p className={`text-[11px] font-mono ${textSub}`}>
                  Zero-config privacy-first traffic & Web Vitals
                </p>
              </div>
            </div>

            <div className="w-24">
              <StudioBooleanSwitch
                checked={tracking.vercelAnalyticsEnabled}
                onChange={(checked) =>
                  setTracking({ ...tracking, vercelAnalyticsEnabled: checked })
                }
                isDark={!isLight}
              />
            </div>
          </div>

          <p className={`text-xs font-mono leading-relaxed ${textSub}`}>
            Automatically tracks real visitors, geolocation, and page routes without client cookies, optimized natively for Vercel edge runtime.
          </p>
        </div>

        {/* 2. GOOGLE ANALYTICS (GA4) */}
        <div className={`p-6 rounded-2xl border space-y-4 ${cardCls}`}>
          <div className={`flex items-center justify-between pb-3 border-b ${borderSep}`}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold text-xs shrink-0">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <h3 className={`text-sm font-bold font-mg12-bold ${textHeading}`}>
                  Google Analytics 4 (GA4)
                </h3>
                <p className={`text-[11px] font-mono ${textSub}`}>
                  Global measurement ID & live stream telemetry
                </p>
              </div>
            </div>

            <div className="w-24">
              <StudioBooleanSwitch
                checked={tracking.googleAnalyticsEnabled ?? true}
                onChange={(checked) =>
                  setTracking({ ...tracking, googleAnalyticsEnabled: checked })
                }
                isDark={!isLight}
              />
            </div>
          </div>

          <div className="space-y-1.5 pt-1">
            <label className={`block text-xs font-mono uppercase tracking-wider ${textSub}`}>
              Measurement ID (G-XXXXXXXXXX)
            </label>
            <input
              type="text"
              value={tracking.googleAnalyticsId}
              onChange={(e) => setTracking({ ...tracking, googleAnalyticsId: e.target.value })}
              placeholder="G-ABC123XYZ"
              className={`w-full px-3.5 py-2.5 rounded-xl border font-mono text-xs focus:outline-none transition-colors ${inputCls}`}
            />
          </div>
        </div>

        {/* 3. META PIXEL */}
        <div className={`p-6 rounded-2xl border space-y-4 ${cardCls}`}>
          <div className={`flex items-center justify-between pb-3 border-b ${borderSep}`}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-500 flex items-center justify-center font-bold text-xs shrink-0">
                <Radio className="w-4 h-4" />
              </div>
              <div>
                <h3 className={`text-sm font-bold font-mg12-bold ${textHeading}`}>
                  Meta Pixel Integration
                </h3>
                <p className={`text-[11px] font-mono ${textSub}`}>
                  Conversion tracking for Instagram & Facebook ads
                </p>
              </div>
            </div>

            <div className="w-24">
              <StudioBooleanSwitch
                checked={tracking.metaPixelEnabled}
                onChange={(checked) =>
                  setTracking({ ...tracking, metaPixelEnabled: checked })
                }
                isDark={!isLight}
              />
            </div>
          </div>

          <div className="space-y-1.5 pt-1">
            <label className={`block text-xs font-mono uppercase tracking-wider ${textSub}`}>
              Meta Pixel ID
            </label>
            <input
              type="text"
              value={tracking.metaPixelId}
              onChange={(e) => setTracking({ ...tracking, metaPixelId: e.target.value })}
              placeholder="123456789012345"
              className={`w-full px-3.5 py-2.5 rounded-xl border font-mono text-xs focus:outline-none transition-colors ${inputCls}`}
            />
          </div>
        </div>

        {/* 4. CUSTOM HEADER INJECTION */}
        <div className={`p-6 rounded-2xl border space-y-4 ${cardCls}`}>
          <div className={`flex items-center justify-between pb-3 border-b ${borderSep}`}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-500 flex items-center justify-center font-bold text-xs shrink-0">
                <Code className="w-4 h-4" />
              </div>
              <div>
                <h3 className={`text-sm font-bold font-mg12-bold ${textHeading}`}>
                  Custom Head Snippets
                </h3>
                <p className={`text-[11px] font-mono ${textSub}`}>
                  Hotjar, Clarity, or verification tags
                </p>
              </div>
            </div>

            <div className="w-24">
              <StudioBooleanSwitch
                checked={tracking.customHeadScriptsEnabled ?? true}
                onChange={(checked) =>
                  setTracking({ ...tracking, customHeadScriptsEnabled: checked })
                }
                isDark={!isLight}
              />
            </div>
          </div>

          <div className="space-y-1.5 pt-1">
            <label className={`block text-xs font-mono uppercase tracking-wider ${textSub}`}>
              Raw Snippet Code
            </label>
            <textarea
              rows={3}
              value={tracking.customHeadScripts}
              onChange={(e) => setTracking({ ...tracking, customHeadScripts: e.target.value })}
              placeholder="<!-- Injected into <head> safely -->"
              className={`w-full px-3.5 py-2.5 rounded-xl border font-mono text-xs focus:outline-none transition-colors ${inputCls}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
