"use client"
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import React from "react";
import StoreProvider, { useAppSelector } from "../redux";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isSidebarCollapsed=useAppSelector((state)=>state.global.isSidebarCollapsed);
  return (
    <div className="flex w-full min-h-screen">
      {/* sidebar */}
      <Sidebar />
      <main
        className={`flex flex-col w-full h-full py-7 px-9 ${
          isSidebarCollapsed ? "md:pl-16" : "md:pl-64 "
        }`}
      >
        <Navbar />

        {children}
      </main>
    </div>
  );
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
};

export default DashboardWrapper;
