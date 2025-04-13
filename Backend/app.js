import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

export default app;
