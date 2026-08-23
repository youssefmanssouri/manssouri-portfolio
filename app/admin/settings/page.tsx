"use client";

export const dynamic = "force-dynamic";

import React, { useState } from "react";
import { Save, CheckCircle2, ShieldCheck, Mail, Phone, Linkedin, Github, Globe } from "lucide-react";

export default function AdminSettingsPage() {
  const [email, setEmail] = useState("manssouriyoussef33@gmail.com");
  const [phone, setPhone] = useState("+212 6 56 68 28 13");
  const [linkedIn, setLinkedIn] = useState("https://www.linkedin.com/in/youssef-manssouri-24b4662ba/");
  const [github, setGithub] = useState("https://github.com/youssefmanssouri");
  const [available, setAvailable] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Portfolio Settings</h1>
        <p className="text-sm text-slate-400 mt-1">Manage public contact details, availability badge, and social links.</p>
      </div>

      {saved && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Portfolio settings saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
        {/* Availability Badge */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="font-semibold text-white text-sm block">Freelance Availability</span>
            <span className="text-xs text-slate-400">Controls the "Available for freelance projects" status pill on the hero section</span>
          </div>
          <button
            type="button"
            onClick={() => setAvailable(!available)}
            className={`px-3 py-1.5 rounded-full text-xs font-mono font-semibold transition-colors ${
              available
                ? "bg-emerald-950/80 text-emerald-400 border border-emerald-800"
                : "bg-slate-800 text-slate-500"
            }`}
          >
            {available ? "AVAILABLE" : "UNAVAILABLE"}
          </button>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h2 className="text-xs font-mono text-blue-400 uppercase font-semibold">PUBLIC CONTACT INFORMATION</h2>
          
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-300">Contact Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-300">Phone & WhatsApp Number</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-300">LinkedIn Profile URL</label>
            <div className="relative">
              <Linkedin className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={linkedIn}
                onChange={(e) => setLinkedIn(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-300">GitHub Profile URL</label>
            <div className="relative">
              <Github className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/20 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
