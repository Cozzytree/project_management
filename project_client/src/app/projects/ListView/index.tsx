import Header from "@/components/Header";
import TaskCard from "@/components/TaskCard";
import { Task, useGetTasksQuery } from "@/state/api";

type props = {
   id: string;
   setModelNewTaskOpen: (isOpen: boolean) => void;
};

export default function ListView({ id, setModelNewTaskOpen }: props) {
   const {
      data: taskList,
      isLoading,
      error,
   } = useGetTasksQuery({ projectId: Number(id) });

   if (isLoading) return <div>Loading...</div>;
   if (error) return <div>An error occured</div>;
   return (
      <div className="px-4 pb-8 xl:px-6">
         <div className="pt-5">
            <Header
               isSmallText={false}
               name="List"
               buttonComponent={
                  <button
                     style={{ textShadow: "2px 2px 2px black" }}
                     className="p-2 rounded-md bg-blue-600 text-blue-200"
                     onClick={() => setModelNewTaskOpen(true)}
                  >
                     Add new Task
                  </button>
               }
            />
         </div>

         <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {taskList?.map((task: Task) => (
               <TaskCard key={task.id} task={task} />
            ))}
         </div>
      </div>
   );
}
