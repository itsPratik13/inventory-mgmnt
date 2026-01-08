"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/app/state";
import {
  Icon,
  Layout,
  LucideIcon,
  Menu,
  Archive,
  Clipboard,
  User,
  Settings,
  CircleDollarSign,
} from "lucide-react";
import Image from "next/image";

import Link from "next/link";
import { usePathname } from "next/navigation";

import React from "react";
interface SidebarLinkProps {
  href: string;
  label: string;
  icon: LucideIcon;
  isCollapsed: boolean;
}

const SidebarLink = ({
  href,
  label,
  icon: Icon,
  isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname == href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center ${
          isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
        }
      hover:bg-zinc-700 gap-3 ${
        isActive ? "bg-zinc-800 font-semibold" : "font-medium"
      }

      `}
      >
        <Icon className="w-6 h-6" />
        <span
          className={`${isCollapsed ? "hidden" : "block"} font-medium text-sm`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

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
      <div className="flex gap-5 justify-between md:justify-normal items-center pt-8 ">
        <Image
          src="/xp.jpg"
          alt="profile"
          width={50}
          height={50}
          className="rounded-xl h-full object-cover"
        />
        {!isSidebarCollapsed && (
          <h1 className="font-semibold block text-2xl mb-0.5 ">Stock</h1>
        )}
        <button
          className="md:hidden px-3 py-3 hover:bg-white/5 transition rounded-full"
          onClick={() => toggleSidebar()}
        >
          <Menu className="h-4 w-4" />
        </button>
      </div>
      {/* links */}

      <div className="grow mt-8">
        <SidebarLink
          href="/dashboard"
          icon={Layout}
          label="Dashboard"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/inventory"
          icon={Archive}
          label="Inventory"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/products"
          icon={Clipboard}
          label="Products"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/users"
          icon={User}
          label="Users"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/settings"
          icon={Settings}
          label="Settings"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/expenses"
          icon={CircleDollarSign}
          label="Expenses"
          isCollapsed={isSidebarCollapsed}
        />
      </div>

      {/* footer  */}
      <div className="text-center text-xs">
        &copy; {new Date().getFullYear()} Stock. All rights reserved.
      </div>
    </div>
  );
};

export default Sidebar;
