import { Router } from "express";
import { getTeams } from "../controllers/teamController.js";

const router = Router();

router.get("/", getTeams);
export default router;