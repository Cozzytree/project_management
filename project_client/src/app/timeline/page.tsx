"use client";

import { useAppSelector } from "@/components/redux";
import {
   Project,
   Task,
   useGetProjectsQuery,
   useGetTasksQuery,
} from "@/state/api";
import React, { useMemo, useState } from "react";
import "gantt-task-react/dist/index.css";
import { DisplayOption, Gantt, ViewMode } from "gantt-task-react";
import Header from "@/components/Header";

type TaskTypeItems = "task" | "milestone" | "project";

export default function TimeLine() {
   const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
   const { data: projects, isLoading, error } = useGetProjectsQuery();

   const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
      viewMode: ViewMode.Month,
      locale: "en-US",
   });

   const ganttTasks = useMemo(() => {
      return (
         projects?.map((project: Project) => ({
            id: JSON.stringify(project.id),
            start: new Date(project.startDate as string),
            end: new Date(project.endDate as string),
            name: project.name,
            type: "Project" as TaskTypeItems,
            progress: 50,
            isDisabled: false,
         })) || []
      );
   }, [projects]);

   const handleViewModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setDisplayOptions((prev: DisplayOption) => ({
         ...prev,
         viewMode: e.target.value as ViewMode,
      }));
   };

   if (isLoading) return <div>Loading...</div>;
   if (error || !projects) return <div>An error occured</div>;

   return (
      <div className="px-4 xl:px-6">
         <header className="flex flex-wrap items-center justify-between gap-2 py-3">
            <Header name="Project Tasks Timeline" isSmallText={false} />
            <div className="relative inline-block w-64">
               <select
                  className="focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white text-zinc-800 dark:text-zinc-200"
                  value={displayOptions.viewMode}
                  onChange={handleViewModeChange}
               >
                  <option value={ViewMode.Day}>day</option>
                  <option value={ViewMode.Week}>week</option>
                  <option value={ViewMode.Month}>month</option>
               </select>
            </div>
         </header>

         <div className="overflow-hidden rounded-xl text-zinc-800 dark:text-zinc-200">
            <div className="timeline">
               <Gantt
                  tasks={ganttTasks}
                  {...displayOptions}
                  columnWidth={
                     displayOptions.viewMode === ViewMode.Month ? 150 : 100
                  }
                  listCellWidth="100px"
                  projectBackgroundColor={isDarkMode ? "#101294" : "#1f29317"}
                  projectProgressColor={isDarkMode ? "#1f2937" : "#aeb832"}
                  projectProgressSelectedColor={isDarkMode ? "#000" : "#9ba1a6"}
               />
            </div>
         </div>
      </div>
   );
}
