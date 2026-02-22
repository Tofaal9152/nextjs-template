import { ReactNode } from "react";

export default function SupplierAuthShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050b16] text-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_40%,rgba(17,35,70,0.9),rgba(5,11,22,1))]" />
        <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_30%_30%,rgba(0,229,255,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(35%_35%_at_70%_65%,rgba(0,229,255,0.06),transparent)]" />
      </div>

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-8 py-6 text-xs tracking-[0.25em] text-white/70">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.9)]" />
          <span>SYSTEMS NOMINAL</span>
        </div>
        <div className="text-white/60">SUPPLIER CONSOLE</div>
      </div>

      {/* Center card */}
      <div className="relative z-10 flex min-h-[calc(100vh-120px)] items-center justify-center px-4 pb-14">
        <div className="w-full max-w-xl rounded-[28px] border border-cyan-400/25 bg-[#071226]/70 shadow-[0_30px_80px_rgba(0,0,0,0.55)] backdrop-blur">
          <div className="px-10 pb-10 pt-10">{children}</div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 flex items-center justify-between px-8 pb-6 text-[10px] text-white/35">
        <div>AI SUPPLIER CONSOLE v2.1.4</div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400/90" />
            <span>SECURE CONNECTION</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400/90" />
            <span>REAL-TIME SYNC</span>
          </div>
        </div>
      </div>
    </div>
  );
}
