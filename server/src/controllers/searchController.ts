import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const search = async (req: Request, res: Response): Promise<void> => {
   const { query } = req.query;

   // Check if the query is empty
   if (
      !query ||
      typeof query !== "string" ||
      query.trim() === "" ||
      query.length < 3
   ) {
      res.json({ tasks: [], projects: [], users: [] });
      return;
   }

   try {
      const tasks = await prisma.task.findMany({
         where: {
            OR: [
               { title: { contains: query as string } },
               { description: { contains: query as string } },
            ],
         },
         include: {
            author: true,
            assignee: true,
            comments: true,
            attachments: true,
         },
      });

      const projects = await prisma.project.findMany({
         where: {
            OR: [
               { name: { contains: query as string } },
               { description: { contains: query as string } },
            ],
         },
      });

      const users = await prisma.user.findMany({
         where: {
            OR: [{ username: { contains: query as string } }],
         },
      });
      res.json({ tasks, projects, users });
   } catch (err: any) {
      res.status(500).json({
         message: "error retrieving tasks " + err.message,
      });
   }
};
