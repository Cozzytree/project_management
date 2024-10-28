import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTeams = async (req: Request, res: Response): Promise<void> => {
   try {
      const teams = await prisma.team.findMany();

      const teamWithUsernamse = await Promise.all(
         teams.map(async (team) => {
            const productOwner = await prisma.user.findUnique({
               where: { userId: team.productOwnerUserId! },
               select: { username: true },
            });
            const productManager = await prisma.user.findUnique({
               where: { userId: team.projectManagerUserId! },
               select: { username: true },
            });
            return {
               ...team,
               productOwnerUsername: productOwner?.username,
               productManagerUsername: productManager?.username,
            };
         }),
      );

      res.json(teamWithUsernamse);
   } catch (err: any) {
      res.status(500).json({
         message: "error retrieving users " + err.message,
      });
   }
};
