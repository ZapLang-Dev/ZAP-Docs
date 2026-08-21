"use client";

import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";

export function DocsLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl px-6 py-10 lg:px-8">
          <div className="prose">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
