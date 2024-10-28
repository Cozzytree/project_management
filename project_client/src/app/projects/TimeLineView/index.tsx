import { useAppSelector } from "@/components/redux";
import { Task, useGetTasksQuery } from "@/state/api";
import React, { useMemo, useState } from "react";
import "gantt-task-react/dist/index.css";
import { DisplayOption, Gantt, ViewMode } from "gantt-task-react";
import Header from "@/components/Header";

type props = {
   id: string;
   setModelNewTaskOpen: (isOpen: boolean) => void;
};

type TaskTypeItems = "task" | "milestone" | "project";

export default function TimeLineView({ id, setModelNewTaskOpen }: props) {
   const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
   const {
      data: taskList,
      isLoading,
      error,
   } = useGetTasksQuery({ projectId: Number(id) });

   const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
      viewMode: ViewMode.Month,
      locale: "en-US",
   });

   const ganttTasks = useMemo(() => {
      return taskList?.map((task: Task) => ({
         start: new Date(task.startDate as string),
         end: new Date(task.dueDate as string),
         name: task.title,
         type: "task" as TaskTypeItems,
         isDisabled: false,
      }));
   }, [taskList]);

   const handleViewModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setDisplayOptions((prev: DisplayOption) => ({
         ...prev,
         viewMode: e.target.value as ViewMode,
      }));
   };

   if (isLoading) return <div>Loading...</div>;
   if (error) return <div>An error occured</div>;

   return (
      <div className="px-4 xl:px-6">
         <div className="flex flex-wrap items-center justify-between gap-2 py-3">
            <Header name="Project Tasks Timeline" isSmallText={false} />
            <div className="relative inline-block w-64">
               <select
                  className="focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white"
                  value={displayOptions.viewMode}
                  onChange={handleViewModeChange}
               >
                  <option value={ViewMode.Day}>day</option>
                  <option value={ViewMode.Week}>week</option>
                  <option value={ViewMode.Month}>month</option>
               </select>
            </div>
         </div>
         <div className="overflow-hidden rounded-xl text-zinc-800 dark:text-zinc-200">
            <div className="timeline">
               <Gantt
                  // @ts-ignore
                  tasks={ganttTasks}
                  {...displayOptions}
                  columnWidth={
                     displayOptions.viewMode === ViewMode.Month ? 150 : 100
                  }
                  listCellWidth="100px"
                  barBackgroundColor={isDarkMode ? "#404040" : "#909090"}
                  barBackgroundSelectedColor={
                     isDarkMode ? "#000000" : "#9ba1a6"
                  }
               />
               <div>
                  <button className="bg-blue-700 text-blue-100 p-2 rounded-md hover:text-blue-900 hover:bg-blue-500 transition-backgroung duration-150">
                     Add new task
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}
