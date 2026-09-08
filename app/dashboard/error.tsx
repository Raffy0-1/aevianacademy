"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard error boundary caught exception:", error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center space-y-6 rounded-2xl border border-border bg-card shadow-sm my-8">
      <div className="w-12 h-12 rounded-xl bg-danger/10 border border-danger/20 flex items-center justify-center text-danger">
        <AlertTriangle size={24} />
      </div>

      <div className="max-w-md space-y-2">
        <h2 className="font-display text-2xl text-foreground font-semibold">
          Unable to load dashboard section
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          We encountered a database or connection issue while fetching this section. Please try again or return to your main dashboard.
        </p>
        {error.digest && (
          <p className="text-xs font-mono text-muted-foreground/60 pt-2">
            Reference Code: {error.digest}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Button onClick={() => reset()} variant="copper" size="sm">
          Try Again
        </Button>
        <Link href="/dashboard">
          <Button variant="outline" size="sm">
            Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
