"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed.");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090a0f] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8 p-8 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-mono font-bold text-lg mx-auto">
            YM
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Admin Dashboard</h1>
          <p className="text-xs text-slate-400">Youssef Manssouri Portfolio Administration</p>
        </div>

        {error && (
          <div className="p-3.5 rounded-lg bg-red-950/50 border border-red-800/60 text-red-300 text-xs leading-relaxed">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-medium text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@youssefmanssouri.site"
                className="w-full pl-9 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-lg text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-medium text-slate-300">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-lg text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            variant="primary"
            size="md"
            className="w-full justify-center mt-2"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            {loading ? "Authenticating..." : "Sign In to Admin"}
          </Button>
        </form>

        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-center gap-2 text-[11px] font-mono text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Protected Authentication Layer</span>
        </div>
      </div>
    </div>
  );
}
