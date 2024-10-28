import { MenuIcon, Moon, Search, Settings, Sun } from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "./redux";
import { setIsSarkMode, setIsSideBarCollapsed } from "@/state";

export default function NavBar() {
   const dispatch = useAppDispatch();
   const isSideBardCollapsed = useAppSelector(
      (state) => state.global.isSideBarCollapsed,
   );
   const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

   return (
      <div className="flex items-center justify-between bg-zinc-200 py-2 px-4 dark:bg-zinc-800 dark:text-zinc-100">
         {/* {search} */}
         <div className="flex items-center gap-4">
            {!isSideBardCollapsed ? null : (
               <button
                  onClick={() => {
                     dispatch(setIsSideBarCollapsed(!isSideBardCollapsed));
                  }}
               >
                  <MenuIcon className="h-5 w-5 text-zinc-800 dark:text-zinc-200" />
               </button>
            )}
            <div className="relative flex h-min w-[200px]">
               <Search className="absolute left-1 top-1/2 mr-2 h5 w-5 -translate-y-1/2 transform cursor-pointer text-zinc-800 dark:text-zinc-200" />
               <input
                  className="w-full rounded border-none p-2 bg-zinc-300 dark:bg-zinc-700 pl-6 dark:text-zinc-200 placeholder-blue-500"
                  type="search"
                  placeholder="Search"
               />
            </div>
         </div>

         {/* {icons} */}
         <div className="flex items-center">
            <button
               onClick={() => {
                  dispatch(setIsSarkMode(!isDarkMode));
               }}
               className="px-2 text-zinc-800 dark:text-zinc-200"
            >
               {isDarkMode ? (
                  <Sun className="h-6 w-6" />
               ) : (
                  <Moon className="h-6 w-6" />
               )}
            </button>
            <Link href={"/settings"} className="h-min w-min rounded">
               <Settings className="h-6 w-6 cursor-pointer text-zinc-800 dark:text-zinc-200" />
            </Link>
            <div className="ml-2 mr-5 min-h-[2em] w-[0.1rem] hidden md:inline-block bg-zinc-400 dark:bg-zinc-700"></div>
         </div>
      </div>
   );
}
