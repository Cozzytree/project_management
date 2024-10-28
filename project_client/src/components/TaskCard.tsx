import { Task } from "@/state/api";
import { format } from "date-fns";
import Image from "next/image";

type props = {
   task: Task;
};

export default function TaskCard({ task }: props) {
   return (
      <div className="mb-3 rounded bg-zinc-300 dark:bg-zinc-700/50 text-zinc-800 dark:text-zinc-200 shadow-md dark:shadow-zinc-700/50 py-2 px-3">
         {task.attachments && task.attachments.length > 0 && (
            <div className="pb-2">
               <strong>Attachments</strong>
               <div className="flex flex-wrap">
                  <Image
                     src={"/logo.png"}
                     alt={task.attachments[0].fileName}
                     width={200}
                     height={150}
                     className="max-h-[400px] w-fit rounded-t-md"
                  />
               </div>
            </div>
         )}

         <div className="space-y-2">
            <p>
               <strong>ID :</strong> {task.id}
            </p>
            <p>
               <strong>Title :</strong> {task.title}
            </p>
            <p>
               <strong>Description :</strong>{" "}
               {task.description || "no description"}
            </p>
            <p>
               <strong>Status :</strong> {task.status}
            </p>
            <p>
               <strong>Priority :</strong> {task.priority}
            </p>
            <p>
               <strong>Tags :</strong> {task.tags}
            </p>
            <p>
               <strong>Start Date :</strong>
               {task.startDate
                  ? format(new Date(task.startDate), "p")
                  : "Not Set"}
            </p>
            <p>
               <strong>Due Date :</strong>
               {task.dueDate ? format(new Date(task.dueDate), "p") : "Not Set"}
            </p>
            <p>
               <strong>Author :</strong>{" "}
               {task.author ? task.author.username : "unknown"}
            </p>
            <p>
               <strong>Assingnee :</strong>{" "}
               {task.author ? task.assignee?.username : "Unknown"}
            </p>
         </div>
      </div>
   );
}
