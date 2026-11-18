"use client";

import React, { useState, useTransition } from "react";
import {
  Palette,
  Sparkles,
  Image as ImageIcon,
  Type,
  Check,
  RotateCcw,
  Sun,
  Moon,
  Layers,
  Sliders,
  SlidersHorizontal,
} from "lucide-react";
import { ThemeSettings, BrandingSettings, LogoType, LogoFontWeight } from "@/lib/cms/types";
import { updateThemeAction, updateBrandingAction } from "@/app/admin/actions";
import GravityLogo from "@/components/logo/GravityLogo";
import CtaButton from "@/components/ui/CtaButton";
import ScrambleText from "@/components/ui/ScrambleText";
import ThemeToggleSwitch, {
  StudioSegmentedToggle,
  StudioBooleanSwitch,
} from "@/components/ui/StudioToggle";
import { useAdminTheme } from "@/components/admin/AdminThemeContext";

interface ThemeBrandingClientProps {
  initialTheme: ThemeSettings;
  initialBranding: BrandingSettings;
  isDark?: boolean;
}

const PRESET_ACCENTS = [
  { name: "Crimson Red", hex: "#ED3327" },
  { name: "Emerald Cyber", hex: "#10B981" },
  { name: "Electric Blue", hex: "#3B82F6" },
  { name: "Hyper Violet", hex: "#8B5CF6" },
  { name: "Solar Gold", hex: "#F59E0B" },
  { name: "Monochrome Minimal", hex: "#FFFFFF" },
];

export default function ThemeBrandingClient({
  initialTheme,
  initialBranding,
}: ThemeBrandingClientProps) {
  const { isLight } = useAdminTheme();
  const [theme, setTheme] = useState<ThemeSettings>(initialTheme);
  const [branding, setBranding] = useState<BrandingSettings>(initialBranding);
  const [previewBgDark, setPreviewBgDark] = useState<boolean>(true);
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
      const themeRes = await updateThemeAction(theme);
      const brandingRes = await updateBrandingAction(branding);

      if (themeRes.success && brandingRes.success) {
        setToastMessage("Theme, Button & Branding configurations saved directly to MongoDB.");
        setTimeout(() => setToastMessage(null), 4000);
      } else {
        setToastMessage(`Error: ${themeRes.error || brandingRes.error}`);
      }
    });
  };

  const currentAccent = theme.accentColor || "#ED3327";

  return (
    <div className="space-y-8 select-none">
      {/* Page Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b ${borderSep}`}>
        <div>
          <div className="flex items-center gap-3">
            <h1 className={`text-xl sm:text-2xl font-bold font-mg12-bold tracking-tight ${textHeading}`}>
              <ScrambleText text="Global Theme & Branding Management" hoverColor={currentAccent} />
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-[11px] font-bold">
              REAL-TIME SYNC
            </span>
          </div>
          <p className={`text-xs font-mono mt-1 ${textSub}`}>
            Configure studio colors, Button styling, ScrambleText animations, and the Flexible Logo Engine
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

      {/* Grid: Left Settings, Right Live Logo & Branding Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* 1. FLEXIBLE LOGO ENGINE */}
          <div className={`p-6 rounded-2xl border space-y-6 ${cardCls}`}>
            <div className={`flex items-center justify-between pb-4 border-b ${borderSep}`}>
              <div className="flex items-center gap-2.5">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-black font-bold text-xs"
                  style={{ backgroundColor: currentAccent }}
                >
                  <Type className="w-4 h-4" />
                </div>
                <div>
                  <h2 className={`text-sm font-bold font-mg12-bold ${textHeading}`}>
                    Flexible Logo Engine
                  </h2>
                  <p className={`text-[11px] font-mono ${textSub}`}>
                    Controls the exact logo on BOTH the live website and this admin panel
                  </p>
                </div>
              </div>

              {/* Reusable Logo Mode Segmented Switch */}
              <StudioSegmentedToggle<LogoType>
                value={branding.logoType}
                onChange={(val) => setBranding({ ...branding, logoType: val })}
                options={[
                  { value: "text", label: "Text Logo", icon: Type },
                  { value: "image", label: "Image Logo", icon: ImageIcon },
                ]}
                isDark={!isLight}
                size="sm"
              />
            </div>

            {/* Option A: Text Logo Controls */}
            {branding.logoType === "text" && (
              <div className="space-y-4 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
                      Studio Brand Text
                    </label>
                    <input
                      type="text"
                      value={branding.textLogo.brandName}
                      onChange={(e) =>
                        setBranding({
                          ...branding,
                          textLogo: { ...branding.textLogo, brandName: e.target.value },
                        })
                      }
                      placeholder="e.g. gravity studios"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black border border-neutral-800 text-white font-mono text-xs focus:outline-none focus:border-[#ED3327]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
                      Typography Weight
                    </label>
                    <select
                      value={branding.textLogo.fontWeight}
                      onChange={(e) =>
                        setBranding({
                          ...branding,
                          textLogo: {
                            ...branding.textLogo,
                            fontWeight: e.target.value as LogoFontWeight,
                          },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black border border-neutral-800 text-white font-mono text-xs focus:outline-none focus:border-[#ED3327]"
                    >
                      <option value="light">Light (300)</option>
                      <option value="regular">Regular (400)</option>
                      <option value="semibold">SemiBold (600)</option>
                      <option value="bold">Bold (700)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                    <div>
                      <span className="text-xs font-mono text-neutral-200 block">
                        Uppercase Lettering
                      </span>
                      <span className="text-[10px] font-mono text-neutral-500">
                        Convert brand text to uppercase
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={branding.textLogo.uppercase}
                      onChange={(e) =>
                        setBranding({
                          ...branding,
                          textLogo: { ...branding.textLogo, uppercase: e.target.checked },
                        })
                      }
                      className="w-4 h-4 accent-[#ED3327] cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                    <div>
                      <span className="text-xs font-mono text-neutral-200 block">
                        Orbiting 3D Dot
                      </span>
                      <span className="text-[10px] font-mono text-neutral-500">
                        Spinning WebGL orbit dot animation
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={branding.textLogo.orbitingDot}
                      onChange={(e) =>
                        setBranding({
                          ...branding,
                          textLogo: { ...branding.textLogo, orbitingDot: e.target.checked },
                        })
                      }
                      className="w-4 h-4 accent-[#ED3327] cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Option B: Image/Asset Logo Controls */}
            {branding.logoType === "image" && (
              <div className="space-y-4 pt-1">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
                    Primary Logo Image URL
                  </label>
                  <input
                    type="text"
                    value={branding.imageLogo.url}
                    onChange={(e) =>
                      setBranding({
                        ...branding,
                        imageLogo: { ...branding.imageLogo, url: e.target.value },
                      })
                    }
                    placeholder="/favicon.svg or https://..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black border border-neutral-800 text-white font-mono text-xs focus:outline-none focus:border-[#ED3327]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
                      Logo Height (px)
                    </label>
                    <input
                      type="number"
                      min="16"
                      max="80"
                      value={branding.imageLogo.height}
                      onChange={(e) =>
                        setBranding({
                          ...branding,
                          imageLogo: {
                            ...branding.imageLogo,
                            height: parseInt(e.target.value) || 28,
                          },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black border border-neutral-800 text-white font-mono text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
                      Image Alt Text
                    </label>
                    <input
                      type="text"
                      value={branding.imageLogo.alt}
                      onChange={(e) =>
                        setBranding({
                          ...branding,
                          imageLogo: { ...branding.imageLogo, alt: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black border border-neutral-800 text-white font-mono text-xs"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 2. BUTTONS & SCRAMBLE TEXT SETUP (USER REQUESTED!) */}
          <div className={`p-6 rounded-2xl border space-y-6 ${cardCls}`}>
            <div className={`flex items-center gap-2.5 pb-4 border-b ${borderSep}`}>
              <div className="w-7 h-7 rounded-lg bg-neutral-900 flex items-center justify-center text-white text-xs">
                <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <h2 className={`text-sm font-bold font-mg12-bold ${textHeading}`}>
                  Buttons & ScrambleText Animation Engine
                </h2>
                <p className={`text-[11px] font-mono ${textSub}`}>
                  Global controls for CtaButton tokens and interactive ScrambleText effects
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
                  Button Shape
                </label>
                <select
                  value={theme.buttonShape}
                  onChange={(e) => setTheme({ ...theme, buttonShape: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black border border-neutral-800 text-white font-mono text-xs focus:outline-none focus:border-[#ED3327]"
                >
                  <option value="square">Square (Studio Sharp)</option>
                  <option value="pill">Pill (Full Rounded)</option>
                  <option value="rounded">Soft Rounded (8px)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
                  Button Base Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme.buttonBgColor || "#000000"}
                    onChange={(e) => setTheme({ ...theme, buttonBgColor: e.target.value })}
                    className="w-9 h-9 rounded-lg bg-black border border-neutral-800 cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    value={theme.buttonBgColor || "#000000"}
                    onChange={(e) => setTheme({ ...theme, buttonBgColor: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-black border border-neutral-800 text-white font-mono text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
                  Button Hover Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme.buttonHoverBg || "#ED3327"}
                    onChange={(e) => setTheme({ ...theme, buttonHoverBg: e.target.value })}
                    className="w-9 h-9 rounded-lg bg-black border border-neutral-800 cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    value={theme.buttonHoverBg || "#ED3327"}
                    onChange={(e) => setTheme({ ...theme, buttonHoverBg: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-black border border-neutral-800 text-white font-mono text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Scramble Text controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <StudioBooleanSwitch
                checked={theme.scrambleEnabled}
                onChange={(checked) => setTheme({ ...theme, scrambleEnabled: checked })}
                label="ScrambleText Effect"
                description="Interactive text decoding on hover"
                isDark={!isLight}
              />

              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
                  Scramble Text Hover Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme.scrambleHoverColor || "#ED3327"}
                    onChange={(e) => setTheme({ ...theme, scrambleHoverColor: e.target.value })}
                    className="w-9 h-9 rounded-lg bg-black border border-neutral-800 cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    value={theme.scrambleHoverColor || "#ED3327"}
                    onChange={(e) => setTheme({ ...theme, scrambleHoverColor: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-black border border-neutral-800 text-white font-mono text-xs"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3. COLOR PALETTE PRESETS */}
          <div className={`p-6 rounded-2xl border space-y-4 ${cardCls}`}>
            <label className={`block text-xs font-mono uppercase tracking-wider ${textSub}`}>
              Studio Color Preset Swatches
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {PRESET_ACCENTS.map((preset) => {
                const isSelected = theme.accentColor === preset.hex;
                return (
                  <button
                    key={preset.hex}
                    type="button"
                    onClick={() =>
                      setTheme({
                        ...theme,
                        accentColor: preset.hex,
                        buttonHoverBg: preset.hex,
                        scrambleHoverColor: preset.hex,
                      })
                    }
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                      isSelected
                        ? isLight
                          ? "bg-neutral-900 border-black text-white shadow-xs"
                          : "bg-neutral-900 border-white text-white shadow-xs"
                        : isLight
                        ? "bg-neutral-50 border-neutral-200 text-neutral-700 hover:text-black hover:border-neutral-300"
                        : "bg-black border-neutral-900 text-neutral-400 hover:text-white hover:border-neutral-800"
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-black/40 shrink-0"
                      style={{ backgroundColor: preset.hex }}
                    />
                    <span className="truncate">{preset.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Live Interactive Preview Sandbox (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className={`p-6 rounded-2xl border sticky top-24 space-y-6 ${cardCls}`}>
            <div className={`flex items-center justify-between pb-3 border-b ${borderSep}`}>
              <div>
                <h3 className={`text-sm font-bold font-mg12-bold ${textHeading}`}>
                  Interactive Live Preview
                </h3>
                <p className={`text-[11px] font-mono ${textSub}`}>
                  Renders with the exact components from the live website
                </p>
              </div>

              {/* Reusable Studio Theme Toggle for Live Preview Sandbox */}
              <ThemeToggleSwitch
                isDark={previewBgDark}
                onToggle={() => setPreviewBgDark(!previewBgDark)}
                size="sm"
              />
            </div>

            {/* Sandbox Canvas */}
            <div
              className={`p-8 rounded-xl border transition-colors duration-300 flex flex-col items-center justify-center min-h-[260px] relative overflow-hidden space-y-6 ${
                previewBgDark
                  ? "bg-[#000000] border-neutral-800 text-white"
                  : "bg-[#F4F4F0] border-neutral-300 text-black"
              }`}
            >
              {/* Render EXACT GravityLogo */}
              <GravityLogo
                showLink={false}
                isDark={!previewBgDark}
                textSize="text-2xl"
                branding={branding}
              />

              {/* Interactive ScrambleText Sample */}
              <div className="text-xs font-mono tracking-wider">
                <ScrambleText
                  text="HOVER TO TEST SCRAMBLE EFFECT"
                  hoverColor={theme.scrambleHoverColor || currentAccent}
                  interactive={theme.scrambleEnabled}
                />
              </div>

              {/* Interactive CtaButton Sample */}
              <CtaButton
                variant={previewBgDark ? "brand" : "white"}
                shape={theme.buttonShape}
                className="!py-3 !px-6 text-xs font-mono font-bold"
              >
                EXPLORE PROJECTS →
              </CtaButton>
            </div>

            {/* Specs Readout */}
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-900 font-mono text-xs space-y-2 text-neutral-400">
              <div className="flex justify-between">
                <span>Database:</span>
                <span className="text-emerald-400 font-semibold">MONGODB ATLAS</span>
              </div>
              <div className="flex justify-between">
                <span>Button Shape:</span>
                <span className="text-white uppercase font-bold">{theme.buttonShape}</span>
              </div>
              <div className="flex justify-between">
                <span>ScrambleText:</span>
                <span className={theme.scrambleEnabled ? "text-emerald-400" : "text-neutral-500"}>
                  {theme.scrambleEnabled ? "ENABLED" : "OFF"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
