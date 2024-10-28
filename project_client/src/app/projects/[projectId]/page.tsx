"use client";

import { useState } from "react";
import ProjectHeader from "./projectHeader";
import BoardView from "../BoardView";
import ListView from "../ListView";
import TimeLineView from "../TimeLineView";
import TableView from "../TableView";
import ModalNewTask from "@/components/ModalNewTask";

type props = {
   params: { projectId: string };
};

export default function ProjectPage({ params }: props) {
   const { projectId } = params;
   const [activeTab, setActieTab] = useState("Board");
   const [isModelNewTaskOpen, setModelNewTaskOpen] = useState(false);

   return (
      <div>
         <ModalNewTask
            isOpen={isModelNewTaskOpen}
            onClose={() => setModelNewTaskOpen(false)}
            id={parseInt(projectId)}
         />
         <ProjectHeader activeTab={activeTab} setActiveTab={setActieTab} />
         {activeTab === "Board" && (
            <BoardView
               setModelNewTaskOpen={setModelNewTaskOpen}
               id={projectId}
            />
         )}
         {activeTab === "List" && (
            <ListView
               id={projectId}
               setModelNewTaskOpen={setModelNewTaskOpen}
            />
         )}

         {activeTab === "TimeLine" && (
            <TimeLineView
               id={projectId}
               setModelNewTaskOpen={setModelNewTaskOpen}
            />
         )}
         {activeTab === "Table" && (
            <TableView
               id={projectId}
               setModelNewTaskOpen={setModelNewTaskOpen}
            />
         )}
      </div>
   );
}
