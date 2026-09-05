"use client";

import React, { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global application error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-[#1C2A38] text-[#FAF7F2] font-sans min-h-screen flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        {/* Subtle Ambient Layer */}
        <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-[#C86D51]/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#1C2A38] blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-md space-y-6 bg-[#253545]/90 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-[#C86D51]/20 border border-[#C86D51]/40 flex items-center justify-center text-[#C86D51] font-bold text-2xl mx-auto shadow-inner">
            A
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-white">System Error</h1>
            <p className="text-sm text-gray-300">
              A critical exception occurred. Click below to reload the application.
            </p>
            {error.digest && (
              <p className="text-xs font-mono text-gray-400 pt-2">
                Digest: {error.digest}
              </p>
            )}
          </div>
          <button
            onClick={() => reset()}
            className="w-full py-2.5 px-4 rounded-lg bg-[#C86D51] hover:bg-[#b55f45] text-white font-medium transition-colors shadow-md"
          >
            Reload Page
          </button>
        </div>
      </body>
    </html>
  );
}
