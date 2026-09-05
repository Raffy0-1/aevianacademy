"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AbstractBackground } from "@/components/ui/abstract-background";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application runtime error:", error);
  }, [error]);

  return (
    <div className="relative min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-6 overflow-hidden">
      <AbstractBackground />

      <div className="relative z-10 w-16 h-16 rounded-2xl bg-copper/10 border border-copper/20 flex items-center justify-center text-copper font-display text-2xl font-bold shadow-lg backdrop-blur-md">
        A
      </div>

      <div className="relative z-10 max-w-md space-y-2">
        <h2 className="font-display text-2xl md:text-3xl text-foreground font-semibold">
          Something went wrong
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          We encountered a temporary server error while rendering this page. You can try refreshing or returning home.
        </p>
        {error.digest && (
          <p className="text-xs font-mono text-muted-foreground/60 pt-2">
            Error Digest: {error.digest}
          </p>
        )}
      </div>

      <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 pt-2">
        <Button onClick={() => reset()} variant="copper" size="sm">
          Try Again
        </Button>
        <Link href="/">
          <Button variant="outline" size="sm">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
