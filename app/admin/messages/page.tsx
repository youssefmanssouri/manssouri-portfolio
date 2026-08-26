"use client";

export const dynamic = "force-dynamic";

import React, { useEffect, useState } from "react";
import { Search, Mail, CheckCircle2, Clock, Archive, Trash2, ExternalLink, X, Globe } from "lucide-react";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  company: string | null;
  projectType: string;
  budgetRange: string | null;
  message: string;
  language: string;
  status: "NEW" | "READ" | "REPLIED" | "ARCHIVED";
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [search, setSearch] = useState<string>("");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const fetchMessages = () => {
    setLoading(true);
    const query = new URLSearchParams();
    if (statusFilter !== "ALL") query.set("status", statusFilter);
    if (search.trim()) query.set("search", search.trim());

    fetch(`/api/admin/messages?${query.toString()}`, {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMessages(data.messages || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMessages();
  }, [statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchMessages();
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        setMessages((prev) =>
          prev.map((msg) => (msg.id === id ? { ...msg, status: newStatus as any } : msg))
        );
        if (selectedMessage?.id === id) {
          setSelectedMessage((prev) => (prev ? { ...prev, status: newStatus as any } : null));
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const res = await fetch(`/api/admin/messages?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setMessages((prev) => prev.filter((msg) => msg.id !== id));
        if (selectedMessage?.id === id) setSelectedMessage(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Contact Messages</h1>
        <p className="text-sm text-slate-400 mt-1">Manage, filter, and reply to client inquiries.</p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Status Filter Tabs */}
        <div className="flex items-center p-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono w-full sm:w-auto overflow-x-auto">
          {["ALL", "NEW", "READ", "REPLIED", "ARCHIVED"].map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 rounded-md transition-colors font-medium whitespace-nowrap ${
                statusFilter === tab
                  ? "bg-blue-600 text-white shadow-sm font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search messages..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </form>
      </div>

      {/* Messages Data Table */}
      {loading ? (
        <div className="p-8 text-center text-slate-500 text-sm animate-pulse">Loading messages...</div>
      ) : messages.length === 0 ? (
        <div className="p-12 rounded-xl bg-slate-900/50 border border-slate-800 text-center text-slate-400 text-sm">
          No contact messages found for the selected filter.
        </div>
      ) : (
        <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-900/60 shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-mono uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Client Name / Email</th>
                  <th className="p-3.5">Project Type</th>
                  <th className="p-3.5">Company</th>
                  <th className="p-3.5">Budget</th>
                  <th className="p-3.5">Lang</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                {messages.map((msg) => (
                  <tr
                    key={msg.id}
                    onClick={() => {
                      setSelectedMessage(msg);
                      if (msg.status === "NEW") updateStatus(msg.id, "READ");
                    }}
                    className="hover:bg-slate-800/40 transition-colors cursor-pointer"
                  >
                    <td className="p-3.5">
                      <span className="font-semibold text-white block">{msg.name}</span>
                      <span className="text-slate-400 text-[11px]">{msg.email}</span>
                    </td>
                    <td className="p-3.5 font-medium">{msg.projectType}</td>
                    <td className="p-3.5 text-slate-400">{msg.company || "—"}</td>
                    <td className="p-3.5 text-slate-400">{msg.budgetRange || "Not specified"}</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px] uppercase">
                        {msg.language}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold ${
                          msg.status === "NEW"
                            ? "bg-emerald-950/80 text-emerald-400 border border-emerald-800/60"
                            : msg.status === "REPLIED"
                            ? "bg-blue-950/80 text-blue-400 border border-blue-800/60"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {msg.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-400 font-mono text-[11px]">
                      {new Date(msg.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="p-3.5 text-right space-x-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => updateStatus(msg.id, "REPLIED")}
                        className="p-1 text-slate-400 hover:text-blue-400"
                        title="Mark as Replied"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteMessage(msg.id)}
                        className="p-1 text-slate-400 hover:text-red-400"
                        title="Delete Message"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Message Details Drawer / Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedMessage(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/50"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="space-y-1 pr-8">
              <span className="text-xs font-mono text-blue-400 uppercase font-semibold">
                INQUIRY DETAILS · ID #{selectedMessage.id.slice(-6)}
              </span>
              <h2 className="text-xl font-bold text-white">{selectedMessage.name}</h2>
              <p className="text-xs text-slate-400">{selectedMessage.email}</p>
            </div>

            {/* Grid Attributes */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
              <div>
                <span className="text-slate-500 block font-mono">PROJECT TYPE</span>
                <span className="text-white font-medium mt-0.5 block">{selectedMessage.projectType}</span>
              </div>
              <div>
                <span className="text-slate-500 block font-mono">COMPANY</span>
                <span className="text-white font-medium mt-0.5 block">{selectedMessage.company || "N/A"}</span>
              </div>
              <div>
                <span className="text-slate-500 block font-mono">BUDGET</span>
                <span className="text-white font-medium mt-0.5 block">{selectedMessage.budgetRange || "Not specified"}</span>
              </div>
              <div>
                <span className="text-slate-500 block font-mono">LANGUAGE</span>
                <span className="text-white font-medium mt-0.5 block font-mono uppercase">{selectedMessage.language}</span>
              </div>
            </div>

            {/* Full Message Body */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase font-semibold">MESSAGE CONTENT:</span>
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                {selectedMessage.message}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateStatus(selectedMessage.id, "REPLIED")}
                  className="px-3 py-1.5 rounded-lg bg-blue-600/20 border border-blue-500/40 text-blue-300 text-xs font-medium hover:bg-blue-600/30 transition-colors"
                >
                  Mark as Replied
                </button>
                <button
                  onClick={() => updateStatus(selectedMessage.id, "ARCHIVED")}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium hover:bg-slate-700 transition-colors"
                >
                  Archive
                </button>
              </div>

              <a
                href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.projectType)} Inquiry — Youssef Manssouri`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20"
              >
                <Mail className="w-4 h-4" />
                <span>Reply by Email</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
