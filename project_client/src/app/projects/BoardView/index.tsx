import {
   Status,
   useGetTasksQuery,
   useUpdateTaskStatusMutation,
} from "@/state/api";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Task as TaskType } from "@/state/api";
import { EllipsisVertical, MessageSquareMore, PlusIcon } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";

type props = {
   id: string;
   setModelNewTaskOpen: (isOpen: boolean) => void;
};

const tasksStatus = ["To Do", "Work In Progress", "Under Review", "Completed"];

export default function BoardView({ setModelNewTaskOpen, id }: props) {
   const {
      data: taskList,
      isLoading,
      error,
   } = useGetTasksQuery({ projectId: Number(id) });
   const [updateTaskStatus] = useUpdateTaskStatusMutation();

   const moveTask = (taskId: number, toStatus: string) => {
      updateTaskStatus({ taskId, status: toStatus });
   };

   if (isLoading) return <div>Loading...</div>;
   if (error) return <div>An error occured</div>;

   return (
      <DndProvider backend={HTML5Backend}>
         <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-4 px-3">
            {tasksStatus?.map((t, i) => (
               <TaskColumn
                  key={i}
                  taskList={taskList || []}
                  status={t as Status}
                  moveTask={moveTask}
                  setModelNewTaskOpen={setModelNewTaskOpen}
               />
            ))}
         </div>
      </DndProvider>
   );
}

type TaskColumnsType = {
   status: Status;
   taskList: TaskType[];
   moveTask: (taskId: number, status: string) => void;
   setModelNewTaskOpen: (v: boolean) => void;
};

function TaskColumn({
   status,
   taskList,
   moveTask,
   setModelNewTaskOpen,
}: TaskColumnsType) {
   const [{ isOer }, drop] = useDrop(() => ({
      accept: "task",
      drop: (item: { id: number }) => moveTask(item.id, status),
      collect: (monitor) => ({
         isOer: !!monitor.isOver(),
      }),
   }));
   const taskCount = taskList.filter((t) => t.status === status).length;

   // type Status = "To Do" | "Work In Progress" | "Under Review" | "Completed";

   const statusColor: Record<string, string> = {
      "To Do": "#2563EB",
      "Work In Progress": "#059669",
      "Under Review": "#D97706",
      Completed: "#000000",
   };

   return (
      <div
         ref={(instance) => {
            drop(instance);
         }}
         className={`${isOer && "bg-blue-600 dark:bg-zinc-800"} sm:py-2 rounded-lg py-1 xl:px-2`}
      >
         <div className="mb-1 flex w-full h-12">
            <div
               style={{ background: statusColor.status }}
               className={`w-3 h-full rounded-s-md`}
            />
            <div className="flex w-full items-center justify-between rounded-e-lg bg-zinc-300 text-zinc-800 dark:text-zinc-200 dark:bg-zinc-700 px-5 py-4">
               <h3 className="flex gap-2 items-center font-semibold text-md sm:text-lg">
                  {status}
                  <span className="text-sm">{taskCount}</span>
               </h3>

               <div className="flex items-center">
                  <button>
                     <EllipsisVertical className="w-4 h-4 text-zinc-800 dark:text-zinc-200" />
                  </button>

                  <button
                     onClick={() => {
                        setModelNewTaskOpen(true);
                     }}
                  >
                     <PlusIcon className="w-5 h-5 rounded-md text-zinc-800 dark:text-zinc-200 bg-zinc-400 dark:bg-zinc-600 p-1" />
                  </button>
               </div>
            </div>
         </div>

         {taskList
            .filter((task) => task.status === status)
            .map((task) => (
               <Task key={task.id} task={task} />
            ))}
      </div>
   );
}

interface TaskProps {
   task: TaskType;
}

const Task = ({ task }: TaskProps) => {
   const [{ isDragging }, drag] = useDrag(() => ({
      type: "task",
      item: { id: task.id },
      collect: (monitor) => ({
         isDragging: monitor.isDragging(),
      }),
   }));

   const taskTagsSplit = task.tags?.split(";");
   const formatStartDate = task.startDate
      ? format(new Date(task.startDate), "P")
      : "";
   const formattedDueDate = task.dueDate
      ? format(new Date(task.dueDate), "P")
      : "";
   // const taskComments = (task.comment && task.comment.length) || 0;

   const PriorityTag = ({ priority }: { priority: TaskType["priority"] }) => (
      <div
         className={`rounded-full px-2 py-1 text-xs font-semibold ${priority === "Urgent" ? "bg-red-600 text-red-100" : priority === "High" ? "bg-yellow-500 text-yellow-900" : priority === "Medium" ? "bg-green-600 text-green-100" : priority === "Low" ? "bg-blue-800 text-blue-200" : "bg-zinc-700 text-zinc-200"}`}
      >
         {priority}
      </div>
   );
   return (
      <div
         ref={(instance) => {
            drag(instance);
         }}
         className={`${isDragging && "border-2 border-blue-700"} mb-4 rounded-md bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200`}
      >
         {task.attachments && task.attachments.length > 0 && (
            <Image
               src={task.attachments[0].fileUrl}
               alt={task.attachments[0].fileName}
               width={400}
               height={200}
               className="h-auto w-full rounded-t-md"
            />
         )}
         <div className="p-4 md:p-4">
            <div className="flex items-center justify-between">
               <div className="flex flex-1 flex-wrap items-center gap-2">
                  {task.priority && <PriorityTag priority={task.priority} />}
                  <div className="flex gap-2">
                     {taskTagsSplit?.map((t) => (
                        <div
                           className={
                              "rounded-full text-blue-900 bg-blue-200 px-2 text-sm"
                           }
                           key={t}
                        >
                           {t}
                        </div>
                     ))}
                  </div>
               </div>
               <button className="flex shrink-0">
                  <EllipsisVertical className="w-4 h-4" />
               </button>
            </div>

            <div className="">
               <h3 className="text-sm text-zinc-800 dark:text-zinc-100 md:text-lg">
                  {task.title}
               </h3>
               {typeof task.points === "number" && (
                  <div>{task.points} points</div>
               )}
            </div>

            <div className="text-xs space-x-2 ring-zinc-800 dark:text-zinc-200">
               {formatStartDate && <span>{formatStartDate}</span>} -
               {formattedDueDate && <span>{formattedDueDate}</span>}
            </div>
            <p className="pt-1 text-sm text-zinc-800 dark:text-zinc-200">
               {task.description}
            </p>

            <div className="mt-4 border border-zinc-800 dark:border-zinc-200 w-full" />

            {/* {users} */}
            <div className="mt-2 flex items-center justify-between">
               <div className="flex items-center gap-1">
                  {task.assignee && (
                     <Image
                        key={task.assignee.useId}
                        src={"/logo.png"}
                        alt={task.assignee.username}
                        width={400}
                        height={200}
                        className="h-8 w-8 rounded-full object-cover border border-zinc-800 dark:border-zinc-100"
                     />
                  )}
                  {task.author && (
                     <Image
                        key={task.author.useId}
                        src={"/logo.png"}
                        alt={task.author.username}
                        width={400}
                        height={200}
                        className="h-8 w-8 rounded-full object-cover border border-zinc-800 dark:border-zinc-100"
                     />
                  )}
               </div>
               <div className="flex items-center text-zinc-200 dark:ring-zinc-800">
                  <MessageSquareMore size={20} cursor={"pointer"} />
               </div>
            </div>
         </div>
      </div>
   );
};
