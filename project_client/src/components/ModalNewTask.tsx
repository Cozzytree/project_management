"use client";

import Modal from "@/components/Modal";
import { Priority, Status, useCreateTaskMutation } from "@/state/api";
import { useState } from "react";
import { formatISO } from "date-fns";

type props = {
   isOpen: boolean;
   onClose: () => void;
   id?: number | null;
};

export default function ModalNewTask({ isOpen, onClose, id }: props) {
   const [createTask, { isLoading }] = useCreateTaskMutation();
   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("");
   const [status, setStatus] = useState<Status>(Status.ToDo);
   const [priority, setPriority] = useState<Priority>(Priority.Backlog);
   const [tags, setTags] = useState("");
   const [startDate, setStartDate] = useState("");
   const [dueDate, setDueDate] = useState("");
   const [authorUserId, setAuthorUserId] = useState("");
   const [assignedUserId, setAssignedUserId] = useState("");
   const [projectId, setProjectId] = useState("");

   const handleSubmit = async () => {
      if (!title || !authorUserId || !id !== null || projectId) return;
      const start = formatISO(new Date(startDate), {
         representation: "complete",
      });
      const end = formatISO(new Date(dueDate), { representation: "complete" });
      await createTask({
         title,
         description,
         tags,
         priority,
         status,
         startDate: start,
         dueDate: end,
         authorUserId: parseInt(authorUserId),
         assignedUserId: parseInt(assignedUserId),
         projectId: id !== null ? Number(id) : Number(projectId),
      });
   };
   const isFormValid = () => {
      return title && authorUserId && (id !== null || projectId);
   };

   const selectStyles =
      "mb-4 w-full rounded border border-zinc-600 dark:border-zinc-300 py-2 px-3 bg-zinc-400 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-300";

   const inputStyles =
      "p-2 w-full rounded outline-none border-zinc-200 text-zinc-800 dark:text-zinc-200 bg-zinc-400 dark:bg-zinc-700 placeholder-zinc-800 dark:placeholder-zinc-300";

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
               onChange={(e) => setTitle(e.target.value)}
               className={inputStyles}
               placeholder="Title"
               value={title}
            />
            <textarea
               onChange={(e) => setDescription(e.target.value)}
               className={inputStyles + " max-h-36 min-h-10"}
               placeholder="Description"
            />

            <div className="flex items-center w-full justify-between gap-3">
               <select
                  className={selectStyles}
                  value={status}
                  onChange={(e) =>
                     setStatus(Status[e.target.value as keyof typeof Status])
                  }
               >
                  <option value={Status.ToDo}>To Do</option>
                  <option value={Status.WorkInProgress}>
                     Work in Progress
                  </option>
                  <option value={Status.UnderReview}>Under Review</option>
                  <option value={Status.Completed}>Completed</option>
               </select>

               <select
                  className={selectStyles}
                  value={priority}
                  onChange={(e) =>
                     setPriority(
                        Priority[e.target.value as keyof typeof Priority],
                     )
                  }
               >
                  <option value={Priority.Urgent}>Urgent</option>
                  <option value={Priority.High}>High</option>
                  <option value={Priority.Medium}>Medium</option>
                  <option value={Priority.Low}>Low</option>
                  <option value={Priority.Backlog}>Backlog</option>
               </select>
            </div>

            <input
               className={inputStyles}
               onChange={(e) => setTags(e.target.value)}
               placeholder="Tags (seperated with ,)"
            />

            <div className="flex gap-2 flex-col sm:flex-row items-center">
               <label htmlFor="start">Start Date</label>
               <input
                  value={startDate}
                  type="date"
                  onChange={(e) => setStartDate(e.target.value)}
                  className={inputStyles + " w-16"}
               />
               <label htmlFor="end">End Date</label>
               <input
                  value={dueDate}
                  type="date"
                  onChange={(e) => setDueDate(e.target.value)}
                  className={inputStyles + " w-16"}
               />
            </div>
            <input
               value={authorUserId}
               type="text"
               placeholder="Author userId"
               onChange={(e) => setAuthorUserId(e.target.value)}
               className={inputStyles}
            />
            <input
               value={assignedUserId}
               type="text"
               placeholder="Assigned userId"
               onChange={(e) => setAssignedUserId(e.target.value)}
               className={inputStyles}
            />
            {!id && (
               <input
                  className={inputStyles}
                  type="text"
                  placeholder="ProjectId"
                  onChange={(e) => setProjectId(e.target.value)}
                  value={projectId}
               />
            )}
            <button
               className={`p-2 rounded-md bg-blue-700 text-blue-200 font-medium shadow-sm hover:bg-blue-300 hover:text-blue-800 transition-background duration-150 ${isLoading ? "pointer-events-none opacity-50" : ""}`}
               disabled={!isFormValid() || isLoading}
            >
               {isLoading ? "Creating Task" : "Create Task"}
            </button>
         </form>
      </Modal>
   );
}
