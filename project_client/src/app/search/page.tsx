"use client";

import { useSearchQuery } from "@/state/api";
import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import Header from "@/components/Header";
import TaskCard from "@/components/TaskCard";
import ProjectCard from "@/components/ProjectCard";
import UserCard from "@/components/UserCard";

export default function SearchPage() {
   const [searchTerm, setSearchTerm] = useState("");

   const {
      data: searchResults,
      isLoading,
      error,
   } = useSearchQuery(searchTerm, {});

   const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
      console.log(searchTerm);
   }, 500);

   useEffect(() => {
      return handleSearch.cancel;
   }, [handleSearch.cancel]);

   return (
      <div className="p-6">
         <Header name="Search" isSmallText={false} />
         <input
            className="p-2 rounded-sm outline-0 text-sm text-zinc-800 dark:text-zinc-800"
            type="text"
            placeholder="Search..."
            onChange={handleSearch}
         />

         <div className="py-4">
            {isLoading && <p>Loading ...</p>}
            {error && <p>Error occurred while searcing</p>}
            {!isLoading && (
               <div className="">
                  {searchResults?.tasks && searchResults.tasks.length > 0 && (
                     <h1 className="text-lg text-zinc-800 dark:text-zinc-200">
                        Tasks
                     </h1>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                     {searchResults?.tasks?.map((task) => (
                        <TaskCard task={task} key={task.id} />
                     ))}
                  </div>

                  {searchResults?.projects &&
                     searchResults.projects.length > 0 && (
                        <h1 className="text-lg text-zinc-800 dark:text-zinc-200">
                           Projects
                        </h1>
                     )}

                  {searchResults?.projects?.map((project) => (
                     <ProjectCard project={project} key={project.id} />
                  ))}

                  {searchResults?.users && searchResults.users.length > 0 && (
                     <h1 className="text-lg text-zinc-800 dark:text-zinc-200">
                        Users
                     </h1>
                  )}
                  <div className="grid grid-cols-4">
                     {searchResults?.users?.map((user) => (
                        <UserCard user={user} key={user.useId} />
                     ))}
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}
