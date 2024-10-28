"use client";

import NavBar from "@/components/NavBar";
import StoreProvider, { useAppSelector } from "@/components/redux";
import SideBar from "@/components/SideBar";
import { useEffect } from "react";

function DashBoardLayout({ children }: { children: React.ReactNode }) {
   const isSideBardCollapsed = useAppSelector(
      (state) => state.global.isSideBarCollapsed,
   );
   const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

   useEffect(() => {
      if (isDarkMode) {
         document.documentElement.classList.add("dark");
      } else {
         document.documentElement.classList.remove("dark");
      }
   }, [isDarkMode]);

   return (
      <div className="flex min-h-screen w-full bg-zinc-200 dark:bg-zinc-800">
         <SideBar />
         <main
            className={`flex w-full flex-col bg-zinc-200 dark:bg-zinc-800 ${isSideBardCollapsed ? "" : "md:pl-64"}`}
         >
            <NavBar />
            {children}
         </main>
      </div>
   );
}

export default function DashBoardWrapper({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <StoreProvider>
         <DashBoardLayout>{children}</DashBoardLayout>
      </StoreProvider>
   );
}
