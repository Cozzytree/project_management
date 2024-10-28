"use client";

import { setIsSideBarCollapsed } from "@/state";
import type { LucideIcon } from "lucide-react";
import {
   Briefcase,
   Home,
   LockIcon,
   Search,
   Settings,
   SidebarClose,
   Users,
   User,
   ChevronDown,
   ChevronUp,
   AlertCircleIcon,
   ShieldAlert,
   AlertTriangle,
   AlertOctagon,
   Layers3,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import { useGetProjectsQuery } from "@/state/api";

const routes = [
   { icon: Home, label: "Home", href: "/" },
   { icon: Briefcase, label: "Timeline", href: "/timeline" },
   { icon: Search, label: "Search", href: "/search" },
   { icon: Settings, label: "Settings", href: "/settings" },
   { icon: User, label: "Users", href: "/users" },
   { icon: Users, label: "Team", href: "/team" },
];

export default function SideBar() {
   const dispatch = useAppDispatch();
   const isSideBardCollapsed = useAppSelector(
      (state) => state.global.isSideBarCollapsed,
   );

   const { data: projects } = useGetProjectsQuery();
   const [showProject, setShowProject] = useState(true);
   const [showPriority, setShowPriority] = useState(true);

   const sideBarClasseLines = `fixed flex flex-col justify-start shadow-xl transition-all duration-300 h-full z-40 dark:bg-zinc-700 dark:text-200 bg-zinc-300 text-zinc-800 dark:text-zinc-200 overflow-y-auto overflow-x-clip ${isSideBardCollapsed ? "w-0 hidden" : "w-64"}`;
   return (
      <div className={sideBarClasseLines}>
         {/* {logo} */}
         <div className="flex w-full flex-col justify-start">
            <div className="z-50 flex min-h-16 w-64 items-center justify-between dark:text-zinc-200 px-5">
               <div className="text-xl font-bold">P-Mag</div>

               {isSideBardCollapsed ? null : (
                  <button
                     className="py-3"
                     onClick={() => {
                        dispatch(setIsSideBarCollapsed(!isSideBardCollapsed));
                     }}
                  >
                     <SidebarClose className="w-5 h-5 text-zinc-800 dark:text-zinc-200" />
                  </button>
               )}
            </div>
         </div>

         {/* {team} */}
         <div className="flex items-center gap-5 border-y-1 border-zinc-500 px-8 py-4 bg-zinc-200 dark:bg-zinc-700">
            <Image src={"/logo.png"} alt="logo" width={40} height={40} />
            <div className="flex flex-col justify-center">
               <h3 className="text-md font-bold tracking-wide dark:text-zinc-200">
                  TEAM
               </h3>
               <div className="flex items-start gap-2">
                  <LockIcon className="g-3 w-3 text-zinc-800 dark:text-zinc-200" />
                  <p className="text-sm text-zinc-700 dark:text-zinc-400">
                     private
                  </p>
               </div>
            </div>
         </div>

         {/* { nav bar links} */}
         <nav className="z-10 w-full">
            {routes.map((r) => (
               <SideBarLink
                  icon={r.icon}
                  label={r.label}
                  href={r.href}
                  key={r.label}
               />
            ))}
         </nav>

         {/* { project links} */}
         <button
            onClick={() => {
               setShowProject((prev) => !prev);
            }}
            className="w-full flex items-center justify-between px-6 py-3"
         >
            <span>Projects</span>
            {showProject ? <ChevronUp /> : <ChevronDown />}
         </button>
         {showProject &&
            projects?.map((p) => (
               <SideBarLink
                  key={p.id}
                  icon={Briefcase}
                  label={p.name}
                  href={"/projects/" + p.id}
               />
            ))}

         {/* { priority links} */}
         <button
            onClick={() => {
               setShowPriority((prev) => !prev);
            }}
            className="w-full flex items-center justify-between px-6 py-3"
         >
            <span>Priority</span>
            {showPriority ? <ChevronUp /> : <ChevronDown />}
         </button>
         {showPriority && (
            <>
               <SideBarLink
                  icon={AlertCircleIcon}
                  label="Urgent"
                  href="/priority/Urgent"
               />
               <SideBarLink
                  icon={ShieldAlert}
                  label="High"
                  href="/priority/High"
               />
               <SideBarLink
                  icon={AlertTriangle}
                  label="Medium"
                  href="/priority/Medium"
               />
               <SideBarLink
                  icon={AlertOctagon}
                  label="Low"
                  href="/priority/Low"
               />
               <SideBarLink
                  icon={Layers3}
                  label="Backlog"
                  href="/priority/Backlog"
               />
            </>
         )}
      </div>
   );
}
interface SidebarLinkProps {
   href: string;
   icon: LucideIcon;
   label: string;
}

const SideBarLink = ({ href, icon: Icon, label }: SidebarLinkProps) => {
   const pathName = usePathname();
   const isActive =
      pathName === href || (pathName === "/" && href === "/dashboard");

   return (
      <Link href={href} className="w-full">
         <div
            className={`relative flex cursor-pointer items-center transition-colors gap-3 py-3 px-4 hover:bg-zinc-400 dark:hover:bg-zinc-600 ${isActive ? "bg-zinc-400/70 dark:bg-zinc-600 font-semibold text-zinc-200" : ""}`}
         >
            {isActive && (
               <div className="absolute left-0 top-0 h-full w-1"> </div>
            )}
            <Icon className="w-6 h-6 text-zinc-800 dark:text-zinc-200" />
            <span className="ont-md text-zinc-800 dark:text-zinc-200">
               {label}
            </span>
         </div>
      </Link>
   );
};
