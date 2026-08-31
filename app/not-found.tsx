import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The requested page or project case study could not be found.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F3EFEA] text-[#242222] px-4">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-xs bg-[#3A171C] text-[#F3EFEA] border border-[#DED6CC]/20 shadow-2xl">
        <div className="w-16 h-16 rounded-xs bg-[#A65F4B]/20 border border-[#A65F4B] flex items-center justify-center mx-auto text-[#A65F4B] font-mono text-2xl font-bold">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-[#F3EFEA]">Page Not Found</h1>
          <p className="text-[#DED6CC]/80 text-sm leading-relaxed">
            The requested page or project case study could not be found. It may have been moved or renamed.
          </p>
        </div>

        <div className="pt-2 flex justify-center">
          <Button
            href="/"
            variant="secondary"
            size="md"
            icon={<Home className="w-4 h-4" />}
          >
            Return to Homepage
          </Button>
        </div>
      </div>
    </main>
  );
}
