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
    <section className="py-6 bg-[#3A171C] text-[#F3EFEA] border-y border-[#DED6CC]/20 relative z-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-y-4 gap-x-6 text-[#DED6CC] text-xs font-mono tracking-wider">
          {capabilities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex items-center gap-2.5 hover:text-[#F3EFEA] transition-colors duration-200"
              >
                <Icon className="w-4 h-4 text-[#A65F4B] shrink-0" />
                <span className="uppercase text-[#F3EFEA] font-medium">{item.label}</span>
                {idx < capabilities.length - 1 && (
                  <span className="text-[#DED6CC]/40 hidden lg:inline ml-4">•</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
