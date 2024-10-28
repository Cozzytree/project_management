import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import projectRoutes from "./routes/projectroutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import searchRoutes from "./routes/searcroutes.js";
import userRoutes from "./routes/userRoutes.js";
import teamRoutes from "./routes/teamroutes.js";

dotenv.config();
const app = express();

/* CONFIGURATIONS */
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.get("/", (req, res) => {
   res.send("hello world");
});
app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);
app.use("/search", searchRoutes);
app.use("/users", userRoutes);
app.use("/teams", teamRoutes);

const PORT = Number(process.env.PORT) || 8000;
app.listen(PORT, "0.0.0.0", () => {
   console.log(`server running on port ${PORT}`);
});
