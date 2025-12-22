"use client";
import React from "react";
import { useAppDispatch, useAppSelector } from '@/app/redux'
import { setIsSidebarCollapsed } from '@/app/state'
import { Bell, Menu, MenuIcon, Settings } from "lucide-react";

const Navbar = () => {
  const dispatch=useAppDispatch();
const isSidebarCollapsed=useAppSelector((state)=>state.global.isSidebarCollapsed);
const toggleSidebar=()=>{
  dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
}
  return (
    <div className="flex justify-between w-full mb-7 items-center">
      {/* left  */}
      <div className="flex justify-between items-center gap-5 rounded-full ">
        <button className="px-3 py-3 bg-zinc-800 hover:bg-zinc-700 transition rounded-full text-white" onClick={toggleSidebar}>
          <Menu className="w-4 h-4 " />
        </button>
     
      <div className="relative">
        <input
          type="search"
          placeholder="Type to search products and groups"
          className="w-full rounded-md
             bg-zinc-900 text-white
             border border-zinc-800
             pl-10 pr-3 py-1
             md:w-85
             hover:bg-zinc-800
             focus:bg-zinc-800
             focus:outline-none
             focus:ring-2 focus:ring-indigo-500/20"
        />

        <div className="absolute inset-y-0 left-0 pl-3  flex items-center pointer-events-none">
          <Bell className="" size={20} />
        </div>
      </div>
      </div>
      {/* right */}
      <div className="flex justify-between items-center gap-5">
        <div className="hidden md:flex justify-between items-center gap-5">
          <div className="relative ">
            <Bell size={20} className="cursor-pointer" />
          </div>
          <hr className="h-7 w-0 border border-solid border-l mx-3" />
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-9 h-9">
                image

            </div>
            <span className="font-medium mb-3">John </span>

          </div>
        </div>
        <div className="">
          <Settings  href="/settings" size={24} className="cursor-pointer"/>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
