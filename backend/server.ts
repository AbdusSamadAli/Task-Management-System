import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";
import taskRoutes from "./modules/tasks/task.routes";

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;
app.get("/", (req,res)=>{
  res.send("task management backend running")
})
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
