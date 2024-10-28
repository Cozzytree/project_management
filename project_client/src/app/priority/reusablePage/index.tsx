"use client";

import Header from "@/components/Header";
import ModalNewTask from "@/components/ModalNewTask";
import { useAppSelector } from "@/components/redux";
import TaskCard from "@/components/TaskCard";
import { dataGridClassNames, dataGridSxStyles } from "@/libs/utils";
import { Priority, Task, useGetTasksByUserQuery } from "@/state/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";

type props = {
   priority: Priority;
};

const viewTypes = ["List", "Table"];

const columns: GridColDef[] = [
   {
      field: "title",
      headerName: "Title",
      width: 100,
   },
   {
      field: "description",
      headerName: "Description",
      width: 200,
   },
   {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => (
         <span className="inline-flex rounded-full bg-green-300 px-2 text-green-900 font-bold text-sm">
            {params.value}
         </span>
      ),
   },
   {
      field: "priority",
      headerName: "Priority",
      width: 75,
   },
   {
      field: "tags",
      headerName: "Tags",
      width: 130,
   },
   {
      field: "startDate",
      headerName: "Start Date",
      width: 130,
   },
   {
      field: "dueDate",
      headerName: "Due Date",
      width: 130,
   },
   {
      field: "author",
      headerName: "Author",
      width: 150,
      renderCell: (params) => params.value?.username || "Unknown",
   },
   {
      field: "assignee",
      headerName: "Assignee",
      width: 150,
      renderCell: (params) => params.value?.username || "unAssigned",
   },
];

export default function Index({ priority }: props) {
   const [view, setView] = useState("List");
   const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

   const userId = 1;
   const {
      data: userTasks,
      isLoading,
      isError,
   } = useGetTasksByUserQuery(userId || 0, { skip: userId === null });

   const isDarkModw = useAppSelector((state) => state.global.isDarkMode);

   const filteredTasks = userTasks?.filter(
      (v: Task) => v.priority === priority,
   );
   console.log(filteredTasks);

   if (isLoading) return <div>loading...</div>;
   if (isError || !userTasks) return <p>Error fetching tasks</p>;

   return (
      <div className="p-4 ">
         <ModalNewTask
            isOpen={isModalNewTaskOpen}
            onClose={() => setIsModalNewTaskOpen(false)}
         />
         <Header
            name="Priority Page"
            isSmallText={false}
            buttonComponent={
               <button
                  className="p-2 rounded-md bg-blue-800 text-blue-200 hover:bg-blue-400 hover:text-blue-800 transition-background duration-150 shadow-md"
                  onClick={() => {
                     setIsModalNewTaskOpen(true);
                  }}
               >
                  Add New task
               </button>
            }
         />
         <div className="flex flex-col justify-start gap-2">
            <div className="flex gap-1">
               {viewTypes.map((t) => (
                  <button
                     key={t}
                     onClick={() => setView(t)}
                     className={`${t === view ? "dark:bg-zinc-200 dark:text-zinc-800 bg-zinc-800 text-zinc-200" : "dark:bg-zinc-800 dark:text-zinc-200 bg-zinc-200 text-zinc-800"} shadow-md dark:shadow-zinc-700/40 px-2 py-1 rounded-md transition-background duration-150 w-fit`}
                  >
                     {t}
                  </button>
               ))}
            </div>
            {isLoading ? (
               <div>loading...</div>
            ) : view === "List" ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                  {filteredTasks?.map((t) => <TaskCard key={t.id} task={t} />)}
               </div>
            ) : (
               view === "Table" &&
               filteredTasks && (
                  <div>
                     <DataGrid
                        rows={filteredTasks}
                        columns={columns}
                        getRowId={(row) => row.id}
                        className={dataGridClassNames}
                        sx={dataGridSxStyles(isDarkModw)}
                     />
                  </div>
               )
            )}
         </div>
      </div>
   );
}
