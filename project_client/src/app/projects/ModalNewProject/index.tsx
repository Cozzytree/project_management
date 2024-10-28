"use client";

import Modal from "@/components/Modal";
import { useCreateProjectMutation } from "@/state/api";
import { useState } from "react";
import { formatISO } from "date-fns";
import { format } from "date-fns";

type props = {
   isOpen: boolean;
   onClose: () => void;
};

export default function ModalNewProject({ isOpen, onClose }: props) {
   const [createProject, { isLoading }] = useCreateProjectMutation();
   const [projectName, setProjectName] = useState("");
   const [description, setDescription] = useState("");
   const [startDate, setStartDate] = useState("");
   const [endDate, setEndDate] = useState("");

   const handleSubmit = async () => {
      if (!projectName || !startDate || !endDate) return;
      const start = formatISO(new Date(startDate), {
         representation: "complete",
      });
      const end = formatISO(new Date(endDate), { representation: "complete" });
      await createProject({
         name: projectName,
         description,
         startDate: start,
         endDate: end,
      });
   };
   const isFormValid = () => {
      return projectName && description && startDate && endDate;
   };

   const inputStyles =
      "p-2 w-full rounded outline-none border-zinc-200 text-zinc-800 dark:text-zinc-200 bg-zinc-400 dark:bg-zinc-700 placeholder-blue-800 dark:placeholder-blue-300";

   return (
      <Modal isOpen={isOpen} onClose={onClose} name="Create new Project">
         <form
            onSubmit={(e) => {
               e.preventDefault();
               handleSubmit();
            }}
            className="w-full flex flex-col gap-3 md:px-10 justify-center items-center"
         >
            <input
               type="text"
               onChange={(e) => setProjectName(e.target.value)}
               className={inputStyles}
               placeholder="Project Name"
            />
            <textarea
               onChange={(e) => setDescription(e.target.value)}
               className={inputStyles + " max-h-36 min-h-10"}
               placeholder="Description"
            />
            <div className="flex gap-2 flex-wrap items-center">
               <label htmlFor="start">Start Date</label>
               <input
                  type="date"
                  onChange={(e) => setStartDate(e.target.value)}
                  className={inputStyles + " w-16"}
               />
               <label htmlFor="end">End Date</label>
               <input
                  type="date"
                  onChange={(e) => setEndDate(e.target.value)}
                  className={inputStyles + " w-16"}
               />
            </div>
            <button
               className={`p-2 rounded-md bg-blue-700 text-blue-200 font-medium shadow-sm hover:bg-blue-300 hover:text-blue-800 transition-background duration-150 ${isLoading ? "pointer-events-none opacity-50" : ""}`}
               disabled={!isFormValid() || isLoading}
            >
               {isLoading ? "Creating Project" : "Create Project"}
            </button>
         </form>
      </Modal>
   );
}
