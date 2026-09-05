"use client";

import dynamic from "next/dynamic";
import React from "react";

const AdminDashboardClient = dynamic(
  () =>
    import("@/components/dashboard/admin-dashboard-client").then(
      (mod) => mod.AdminDashboardClient
    ),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-2xl border border-slate-border bg-white p-12 text-center space-y-4 shadow-sm">
        <div className="w-12 h-12 rounded-xl bg-copper/10 border border-copper/30 flex items-center justify-center text-copper font-bold text-xl mx-auto animate-spin">
          A
        </div>
        <p className="text-sm font-extrabold text-navy">
          Loading Platform Control Hub...
        </p>
      </div>
    ),
  }
);

export function AdminDashboardWrapper(props: any) {
  return <AdminDashboardClient {...props} />;
}
