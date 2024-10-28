import { Router } from "express";
import {
   createTask,
   getTasks,
   getUserTasks,
   updateTaskStatus,
} from "../controllers/taskController.js";

const router = Router();

router.get("/", getTasks);
router.get("/user/:userId", getUserTasks);
router.post("/createTask", createTask);
router.patch("/:taskId/status", updateTaskStatus);

export default router;
