import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTasks = async (req: Request, res: Response): Promise<void> => {
   const { projectId } = req.query;
   try {
      const tasks = await prisma.task.findMany({
         where: {
            projectId: Number(projectId),
         },
         include: {
            author: true,
            assignee: true,
            comments: true,
            attachments: true,
         },
      });
      res.json(tasks);
   } catch (err: any) {
      res.status(500).json({
         message: "error retrieving tasks " + err.message,
      });
   }
};

export const createTask = async (
   req: Request,
   res: Response,
): Promise<void> => {
   const {
      title,
      description,
      priority,
      status,
      startDate,
      dueDate,
      projectId,
      points,
      authorUserId,
      assignedUserId,
   } = req.body;
   try {
      const newTask = await prisma.task.create({
         data: {
            title,
            description,
            priority,
            status,
            startDate,
            dueDate,
            projectId,
            points,
            authorUserId,
            assignedUserId,
         },
      });
      res.status(201).json(newTask);
   } catch (err: any) {
      res.status(500).json({
         message: "error creating task " + err.message,
      });
   }
};

export const updateTaskStatus = async (
   req: Request,
   res: Response,
): Promise<void> => {
   const { taskId } = req.params;
   const { status } = req.body;
   try {
      const tasks = await prisma.task.update({
         where: {
            id: Number(taskId),
         },
         data: {
            status: status,
         },
      });
      res.json(tasks);
   } catch (err: any) {
      res.status(500).json({
         message: "error updating status " + err.message,
      });
   }
};

export const getUserTasks = async (
   req: Request,
   res: Response,
): Promise<void> => {
   const { userId } = req.params;
   try {
      const userTasks = await prisma.task.findMany({
         where: {
            OR: [
               { authorUserId: Number(userId) },
               { assignedUserId: Number(userId) },
            ],
         },
         include: {
            author: true,
            assignee: true,
         },
      });
      res.json(userTasks);
   } catch (err: any) {
      res.status(500).json({
         message: "error retrieving userTasks : " + err.message,
      });
   }
};