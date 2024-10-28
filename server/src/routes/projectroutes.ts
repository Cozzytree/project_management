import { Router } from "express";
import {
   createProject,
   getProjects,
} from "../controllers/projectControllers.js";
import { getDefaultAutoSelectFamily } from "net";

const router = Router();

router.get("/", getProjects);
router.post("/createProject", createProject);

export default router;
