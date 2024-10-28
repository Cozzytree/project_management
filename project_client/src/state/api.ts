import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Project {
   id: number;
   name: string;
   description: string;
   startDate: string;
   endDate: string;
}

export interface Teams {
   id: number;
   teamName: string;
   productManagerUserId?: number;
   productOwnerUserId?: number;
}

export interface User {
   useId: number;
   username: string;
   email: string;
   profilePictureUrl: string;
   cognitiOd?: string;
   teamId?: number;
}

export interface Attachment {
   id: number;
   fileUrl: string;
   fileName: string;
   taskId: number;
   uploadedById: number;
}

export enum Status {
   ToDo = "To Do",
   WorkInProgress = "Work In Progress",
   UnderReview = "Under review",
   Completed = "Completed",
}

export enum Priority {
   Urgent = "Urgent",
   High = "High",
   Medium = "Medium",
   Low = "Low",
   Backlog = "Backlog",
}

export interface Task {
   id: number;
   title: string;
   description?: string;
   priority?: Priority;
   tags?: string;
   status: Status;
   startDate?: string;
   dueDate?: string;
   projectId: number;
   points?: string;
   authorUserId: number;
   assignedUserId?: number;

   author?: User;
   assignee?: User;
   comment?: Comment[];
   attachments?: Attachment[];
}

export interface SearchResults {
   projects?: Project[];
   tasks?: Task[];
   users?: User[];
}

export const api = createApi({
   baseQuery: fetchBaseQuery({
      baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
   }),
   reducerPath: "api",
   tagTypes: ["Projects", "Tasks", "Users", "Teams"],
   endpoints: (build) => ({
      getProjects: build.query<Project[], void>({
         query: () => "projects",
         providesTags: [{ type: "Projects" }],
      }),
      createProject: build.mutation<Project, Partial<Project>>({
         query: (project) => ({
            url: "projects/createProject",
            method: "POST",
            body: project,
         }),
         invalidatesTags: ["Projects"],
      }),
      getTasks: build.query<Task[], { projectId: number }>({
         query: ({ projectId }) => `tasks/?projectId=${projectId}`,
         providesTags: (result) =>
            result
               ? result.map(({ id }) => ({ type: "Tasks" as const, id }))
               : [{ type: "Tasks" }],
      }),
      getTasksByUser: build.query<Task[], number>({
         query: (userId) => `tasks/?projectId=${userId}`,
         providesTags: (result) =>
            result
               ? result.map(({ id }) => ({ type: "Tasks", id }))
               : [{ type: "Tasks" }],
      }),
      createTask: build.mutation<Task, Partial<Task>>({
         query: (task) => ({
            url: "tasks/createTask",
            method: "POST",
            body: task,
         }),
         invalidatesTags: ["Tasks"],
      }),
      updateTaskStatus: build.mutation<
         Task,
         { taskId: number; status: string }
      >({
         query: ({ taskId, status }) => ({
            url: `tasks/${taskId}/status`,
            method: "PATCH",
            body: { status },
         }),
         invalidatesTags: (result, error, { taskId }) => [
            { type: "Tasks", id: taskId },
         ],
      }),
      search: build.query<SearchResults, string>({
         query: (query) => ({
            url: `search/?query=${query}`,
            method: "GET",
         }),
      }),
      getUsers: build.query<User[], void>({
         query: () => "users",
         providesTags: [{ type: "Users" }],
      }),
      getTeams: build.query<Teams[], void>({
         query: () => "teams",
         providesTags: [{ type: "Teams" }],
      }),
   }),
});

export const {
   useGetProjectsQuery,
   useCreateProjectMutation,
   useGetTasksQuery,
   useCreateTaskMutation,
   useUpdateTaskStatusMutation,
   useSearchQuery,
   useGetUsersQuery,
   useGetTeamsQuery,
   useGetTasksByUserQuery,
} = api;
