import { Project } from "@/state/api";

type props = {
   project: Project;
};

export default function ProjectCard({ project }: props) {
   return (
      <div className="rounded p-4 shadow-sm text-zinc-800 dark:text-zinc-200">
         <h3>{project.name}</h3>
         <p>{project.description}</p>
         <p>
            {project.startDate} - {project.endDate}
         </p>
      </div>
   );
}
