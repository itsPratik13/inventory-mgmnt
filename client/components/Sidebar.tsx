"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/app/state";
import { Menu } from "lucide-react";
import React from "react";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };
  const fixedSidebarClassname = `fixed flex flex-col
  ${isSidebarCollapsed ? "w-0 md:w-16" : "w-64"}
  bg-[#1A1A1A]
  border-r border-[#333333]
  text-white
  transition-all duration-300
  overflow-hidden
  h-full
  shadow-md
  z-40`;

  return (
    <div className={fixedSidebarClassname}>
      {/* top */}
      <div className="flex gap-3 justify-between md:justify-normal items-center pt-8">
        <div>logo</div>
        <h1 className="font-semibold">Stock</h1>
        <button
          className="md:hidden px-3 py-3 hover:bg-white/5 transition rounded-full"
          onClick={() => toggleSidebar()}
        >
          <Menu className="h-4 w-4" />
        </button>
      </div>
      {/* links */}

      <div className="grow mt-8"></div>

      {/* footer  */}
      <div className="text-center text-xs">
        &copy; {new Date().getFullYear()} Stock. All rights reserved.
      </div>
    </div>
  );
};

export default Sidebar;
