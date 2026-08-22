import React from "react";
import { Monitor, Layout, Cpu, ShoppingBag, LayoutDashboard, Smartphone } from "lucide-react";

export function CapabilityStrip() {
  const capabilities = [
    { label: "Business Websites", icon: Monitor },
    { label: "Landing Pages", icon: Layout },
    { label: "Web Applications", icon: Cpu },
    { label: "E-commerce", icon: ShoppingBag },
    { label: "Dashboards", icon: LayoutDashboard },
    { label: "Responsive Design", icon: Smartphone }
  ];

  return (
    <section className="py-6 bg-[#090a0f] border-y border-white/[0.08] relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-y-4 gap-x-6 text-slate-400 text-xs font-mono tracking-wider">
          {capabilities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex items-center gap-2.5 hover:text-white transition-colors duration-200"
              >
                <Icon className="w-4 h-4 text-blue-500 shrink-0" />
                <span className="uppercase text-slate-300 font-medium">{item.label}</span>
                {idx < capabilities.length - 1 && (
                  <span className="text-slate-800 hidden lg:inline ml-4">•</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
