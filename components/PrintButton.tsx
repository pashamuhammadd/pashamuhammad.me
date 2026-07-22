"use client";

import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-full border border-emerald-400 px-5 py-2.5 text-sm font-semibold text-emerald-400 transition hover:bg-emerald-400 hover:text-black"
    >
      <Printer size={16} />
      Print / Save as PDF
    </button>
  );
}
