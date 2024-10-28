import Header from "@/components/Header";
import {
   Clock,
   Filter,
   Grid3X3,
   Table2,
   Share2,
   Table,
   PlusSquare,
} from "lucide-react";
import { useState } from "react";
import ModalNewProject from "../ModalNewProject";

type props = {
   activeTab: string;
   setActiveTab: (tabName: string) => void;
};

export default function ProjectHeader({ activeTab, setActiveTab }: props) {
   const [isModalNewProjectOpen, setModalNewProjectOpen] = useState(false);
   return (
      <div className="px-4 xl:px-6 ">
         <ModalNewProject
            isOpen={isModalNewProjectOpen}
            onClose={() => setModalNewProjectOpen(false)}
         />
         <Header
            name={"DEVELOPMENT"}
            isSmallText={false}
            buttonComponent={
               <button
                  className="p-2 flex items-center gap-1 bg-blue-800  text-blue-200 hover:bg-blue-300 rounded-md hover:text-blue-800 transition-background duration-100"
                  onClick={() => {
                     setModalNewProjectOpen(true);
                  }}
               >
                  <PlusSquare className="w-5 h-5" /> New Project
               </button>
            }
         />

         {/* { tabs} */}
         <div className="flex flex-wrap-reverse justify-between items-center gap-2 border-y border-zinc-300 shadow-sm dark:border-zinc-700 pt-2">
            <div className="flex items-center gap-2">
               <TabButton
                  name={"Board"}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  icon={<Table2 className="w-5 h-5" />}
               />
               <TabButton
                  name={"List"}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  icon={<Grid3X3 className="w-5 h-5" />}
               />
               <TabButton
                  name={"TimeLine"}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  icon={<Clock className="w-5 h-5" />}
               />
               <TabButton
                  name={"Table"}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  icon={<Table className="w-5 h-5" />}
               />
            </div>
            <div className="flex items-center gap-2 pb-3">
               <Filter className="w-5 h-5 text-zinc-800 dark:text-zinc-200" />
               <button>
                  <Share2 className="w-5 h-5 text-zinc-800 dark:text-zinc-200" />
               </button>
               <div className="relative">
                  <input
                     className="pl-9 pr-3 py-2 rounded-sm bg-zinc-300 dark:bg-zinc-700/50 outline-none"
                     placeholder="search"
                  />
                  <Grid3X3 className="absolute top-2 left-2" />
               </div>
            </div>
         </div>
      </div>
   );
}

type TabButtonProps = {
   name: string;
   icon: React.ReactNode;
   activeTab: string;
   setActiveTab: (tabName: string) => void;
};

const TabButton = ({ name, icon, activeTab, setActiveTab }: TabButtonProps) => {
   const isActive = activeTab === name;

   return (
      <button
         className={`relative flex items-center gap-2 px-1 pb-2 after:absolute ${isActive ? "text-blue-600 dark:text-blue-500 border-b border-blue-500 font-semibold" : "text-zinc-700 dark:text-zinc-400"} transition-border duration-200`}
         onClick={() => setActiveTab(name)}
      >
         {icon}
         {name}
      </button>
   );
};
