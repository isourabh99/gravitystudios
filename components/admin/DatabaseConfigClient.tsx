"use client";

import React, { useState, useTransition } from "react";
import {
  Database,
  Check,
  Download,
  Activity,
  Server,
  Lock,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { DatabaseConfig, CMSFullStore } from "@/lib/cms/types";
import { saveDatabaseConfigAction } from "@/app/admin/actions";
import CtaButton from "@/components/ui/CtaButton";
import CustomInputField from "@/components/ui/CustomInputField";
import ScrambleText from "@/components/ui/ScrambleText";
import { useAdminTheme } from "@/components/admin/AdminThemeContext";

interface DatabaseConfigClientProps {
  initialConfig: DatabaseConfig;
  fullStoreData: CMSFullStore;
  accentColor?: string;
  isDark?: boolean;
}

export default function DatabaseConfigClient({
  initialConfig,
  fullStoreData,
  accentColor = "#ED3327",
}: DatabaseConfigClientProps) {
  const { isLight } = useAdminTheme();
  const [mongoUri, setMongoUri] = useState<string>(initialConfig.mongodbUri || "");
  const [mongoDbName, setMongoDbName] = useState<string>(initialConfig.mongodbDatabase || "gravity_portfolio");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [pingStatus, setPingStatus] = useState<string | null>(null);
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
      const res = await saveDatabaseConfigAction({
        provider: "mongodb",
        mongodbUri: mongoUri,
        mongodbDatabase: mongoDbName,
      });

      if (res.success) {
        setToastMessage("MongoDB connection string saved successfully.");
        setTimeout(() => setToastMessage(null), 4000);
      } else {
        setToastMessage(`Error: ${res.error}`);
      }
    });
  };

  const handleTestConnection = () => {
    setPingStatus("Pinging MongoDB cluster...");
    startTransition(async () => {
      try {
        const res = await fetch("/api/db/test");
        const data = await res.json();
        if (data.success) {
          setPingStatus(`Connected! Ping: ${data.pingMs || 12}ms to cluster.`);
        } else {
          setPingStatus(`Connection test failed: ${data.message}`);
        }
      } catch (err: any) {
        setPingStatus(`Ping error: ${err.message}`);
      }
      setTimeout(() => setPingStatus(null), 7000);
    });
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fullStoreData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `mongodb-gravity-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-8 select-none">
      {/* Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b ${borderSep}`}>
        <div>
          <div className="flex items-center gap-3">
            <h1 className={`text-xl sm:text-2xl font-bold font-mg12-bold tracking-tight ${textHeading}`}>
              <ScrambleText text="MongoDB Atlas Database Engine" hoverColor={accentColor} />
            </h1>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-mono text-xs font-bold">
              EXCLUSIVE DATABASE
            </span>
          </div>
          <p className={`text-xs font-mono mt-1 ${textSub}`}>
            Production cloud document store for real case studies, theme variables, and SEO graphs
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportJson}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs border transition-colors cursor-pointer ${
              isLight
                ? "bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border-neutral-300 shadow-xs"
                : "bg-neutral-900 hover:bg-neutral-800 text-white border-neutral-800"
            }`}
          >
            <Download className={`w-3.5 h-3.5 ${textSub}`} />
            <span>EXPORT BACKUP</span>
          </button>

          <CtaButton onClick={handleSave} variant="brand" shape="square" disabled={isPending} className="!py-3 !px-6 text-xs font-mono font-bold">
            {isPending ? "SAVING..." : "SAVE MONGODB CONFIG"}
          </CtaButton>
        </div>
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

      {/* MongoDB Cluster Active Card */}
      <div className={`p-6 rounded-2xl border space-y-6 ${cardCls}`}>
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b ${borderSep} gap-4`}>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-black font-bold text-sm shadow-[0_0_20px_rgba(237,51,39,0.3)] shrink-0"
              style={{ backgroundColor: accentColor }}
            >
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className={`text-base font-bold font-mg12-bold ${textHeading}`}>
                MongoDB Atlas Cloud Architecture
              </h2>
              <p className={`text-xs font-mono ${textSub}`}>
                All case studies and settings are stored exclusively in MongoDB
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleTestConnection}
            disabled={isPending}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-mono transition-colors cursor-pointer self-start sm:self-auto ${
              isLight
                ? "bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border-neutral-300 shadow-xs"
                : "bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border-neutral-800"
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>Test Connection</span>
          </button>
        </div>

        {pingStatus && (
          <div className={`p-3.5 rounded-xl border font-mono text-xs flex items-center gap-2 ${
            pingStatus.includes("Connected")
              ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-300"
              : "bg-amber-950/30 border-amber-500/40 text-amber-300"
          }`}>
            <Server className="w-4 h-4 shrink-0" />
            <span>{pingStatus}</span>
          </div>
        )}

        {/* Input fields for MongoDB */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <CustomInputField
              label="MongoDB Connection String (URI)"
              name="mongoUri"
              type="password"
              value={mongoUri}
              onChange={(e) => setMongoUri(e.target.value)}
              placeholder="mongodb+srv://<username>:<password>@cluster.mongodb.net/gravity_portfolio"
              isDark={!isLight}
            />
            <p className="text-[11px] font-mono text-neutral-500">
              Can also be provided directly via `MONGODB_URI` environment variable in Vercel or `.env.local`.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CustomInputField
              label="Database Name"
              name="mongoDbName"
              value={mongoDbName}
              onChange={(e) => setMongoDbName(e.target.value)}
              placeholder="gravity_portfolio"
              isDark={!isLight}
            />

            <div className="space-y-2">
              <label className="block text-[11px] sm:text-xs font-mono tracking-wider uppercase select-none text-neutral-500">
                Active Storage Collections
              </label>
              <div className={`p-3 border text-xs font-mono rounded-none ${subCardCls}`}>
                `projects`, `blogs`, `settings`, `pages`, `analytics`
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Step-by-Step Setup Guide Box for User */}
      <div className={`p-6 rounded-2xl border space-y-4 ${cardCls}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <h3 className={`text-sm font-bold font-mg12-bold ${textHeading}`}>
              How to Connect Your MongoDB Atlas Cluster (2 Minutes Setup)
            </h3>
          </div>
          <a
            href="https://cloud.mongodb.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-mono text-neutral-500 hover:text-black dark:hover:text-white"
          >
            <span>cloud.mongodb.com</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 font-mono text-xs">
          <div className={`p-3.5 rounded-xl border space-y-1.5 ${subCardCls}`}>
            <div className="flex items-center gap-2 font-bold text-emerald-500">
              <CheckCircle2 className="w-4 h-4" />
              <span>Step 1: Create Free Cluster</span>
            </div>
            <p className={textSub}>
              Go to MongoDB Atlas and click Create Cluster. Choose the <strong>M0 Free Tier</strong> (AWS / Mumbai or closest region).
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border space-y-1.5 ${subCardCls}`}>
            <div className="flex items-center gap-2 font-bold text-emerald-500">
              <CheckCircle2 className="w-4 h-4" />
              <span>Step 2: Add Database User</span>
            </div>
            <p className={textSub}>
              Under <strong>Database Access</strong>, click Add New Database User. Set username (e.g. <code>studioAdmin</code>) and password.
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border space-y-1.5 ${subCardCls}`}>
            <div className="flex items-center gap-2 font-bold text-emerald-500">
              <CheckCircle2 className="w-4 h-4" />
              <span>Step 3: Network Access (0.0.0.0/0)</span>
            </div>
            <p className={textSub}>
              Under <strong>Network Access</strong>, click Add IP Address and select <strong>Allow Access From Anywhere</strong> (<code>0.0.0.0/0</code>).
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border space-y-1.5 ${subCardCls}`}>
            <div className="flex items-center gap-2 font-bold text-emerald-500">
              <CheckCircle2 className="w-4 h-4" />
              <span>Step 4: Copy URI to .env.local</span>
            </div>
            <p className={textSub}>
              Click <strong>Connect &gt; Drivers</strong>, copy your URI, replace <code>&lt;password&gt;</code>, and paste into <code>.env.local</code> as <code>MONGODB_URI</code>!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
