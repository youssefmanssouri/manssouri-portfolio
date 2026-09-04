import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSessionFromCookie } from "@/lib/auth";
import { LayoutDashboard, MessageSquare, FolderKanban, Settings, LogOut, ExternalLink } from "lucide-react";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSessionFromCookie();

  // If unauthorized, redirect to login page
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-950 border-r border-slate-800 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-2.5 font-bold text-lg text-white">
              <div className="w-7 h-7 rounded-md bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400 font-mono text-xs">
                YM
              </div>
              <span>YM Admin</span>
            </Link>
            <Link
              href="/"
              target="_blank"
              className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1"
              title="View Public Site"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-sm font-medium">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-blue-400" />
              <span>Overview</span>
            </Link>
            <Link
              href="/admin/messages"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Messages</span>
            </Link>
            <Link
              href="/admin/projects"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
            >
              <FolderKanban className="w-4 h-4 text-indigo-400" />
              <span>Project CMS</span>
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
            >
              <Settings className="w-4 h-4 text-slate-400" />
              <span>Settings</span>
            </Link>
          </nav>
        </div>

        {/* Footer Account & Logout */}
        <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <div className="truncate">
            <span className="block font-medium text-slate-200 truncate">{session.email}</span>
            <span className="text-[10px] font-mono text-emerald-400 uppercase">Administrator</span>
          </div>
          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-400 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow p-6 md:p-10 overflow-y-auto" role="region" aria-label="Admin content">
        {children}
      </div>
    </div>
  );
}
