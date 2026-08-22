import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#090a0f] text-slate-100 px-4">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-blue-950/80 border border-blue-800/60 flex items-center justify-center mx-auto text-blue-400 font-mono text-2xl font-bold">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">Page Not Found</h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            The requested page or project case study could not be found. It may have been moved or renamed.
          </p>
        </div>

        <div className="pt-2 flex justify-center">
          <Button
            href="/"
            variant="primary"
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
