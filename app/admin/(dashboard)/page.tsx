"use client";

export const dynamic = "force-dynamic";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MessageSquare, FolderKanban, Activity, Mail, ArrowUpRight, CheckCircle2, Clock } from "lucide-react";

interface AdminStats {
  metrics: {
    totalMessages: number;
    newMessages: number;
    readMessages: number;
    repliedMessages: number;
    totalProjects: number;
    publishedProjects: number;
    featuredProjects: number;
    totalEvents: number;
  };
  recentSubmissions: any[];
}

export default function AdminOverviewPage() {
  const [data, setData] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-48 bg-slate-800 rounded-lg" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-slate-900 border border-slate-800 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const metrics = data?.metrics || {
    totalMessages: 0,
    newMessages: 0,
    readMessages: 0,
    repliedMessages: 0,
    totalProjects: 0,
    publishedProjects: 0,
    featuredProjects: 0,
    totalEvents: 0,
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard Overview</h1>
        <p className="text-sm text-slate-400 mt-1">Real-time metrics, contact submissions, and portfolio activity.</p>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* New Messages */}
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>NEW MESSAGES</span>
            <MessageSquare className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">{metrics.newMessages}</div>
          <div className="text-xs text-emerald-400 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>Unread inquiries requiring response</span>
          </div>
        </div>

        {/* Total Inquiries */}
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>TOTAL INQUIRIES</span>
            <Mail className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">{metrics.totalMessages}</div>
          <div className="text-xs text-slate-400">
            <span>{metrics.repliedMessages} replied · {metrics.readMessages} read</span>
          </div>
        </div>

        {/* CMS Projects */}
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>PORTFOLIO PROJECTS</span>
            <FolderKanban className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">{metrics.totalProjects}</div>
          <div className="text-xs text-indigo-400">
            <span>{metrics.publishedProjects} published · {metrics.featuredProjects} featured</span>
          </div>
        </div>

        {/* Activity Events */}
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>ANALYTICS EVENTS</span>
            <Activity className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">{metrics.totalEvents}</div>
          <div className="text-xs text-slate-400">
            <span>Interactions & conversion events</span>
          </div>
        </div>
      </div>

      {/* Recent Submissions Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Recent Contact Inquiries</h2>
          <Link
            href="/admin/messages"
            className="text-xs font-mono text-blue-400 hover:text-blue-300 flex items-center gap-1"
          >
            <span>View All Messages</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {!data?.recentSubmissions || data.recentSubmissions.length === 0 ? (
          <div className="p-8 rounded-xl bg-slate-900/50 border border-slate-800 text-center text-slate-400 text-sm">
            No contact submissions received yet.
          </div>
        ) : (
          <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-900/60">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 font-mono uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Name / Email</th>
                    <th className="p-3.5">Project Type</th>
                    <th className="p-3.5">Company</th>
                    <th className="p-3.5">Language</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  {data.recentSubmissions.map((sub: any) => (
                    <tr key={sub.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3.5">
                        <span className="font-semibold text-white block">{sub.name}</span>
                        <span className="text-slate-400 text-[11px]">{sub.email}</span>
                      </td>
                      <td className="p-3.5 font-medium">{sub.projectType}</td>
                      <td className="p-3.5 text-slate-400">{sub.company || "N/A"}</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px] uppercase">
                          {sub.language || "en"}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold ${
                            sub.status === "NEW"
                              ? "bg-emerald-950/80 text-emerald-400 border border-emerald-800/60"
                              : sub.status === "REPLIED"
                              ? "bg-blue-950/80 text-blue-400 border border-blue-800/60"
                              : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          {sub.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-400 font-mono text-[11px]">
                        {new Date(sub.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
