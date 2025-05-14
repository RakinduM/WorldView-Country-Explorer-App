import express from "express";
import cors from "cors";
import authRouter from "./api/routes/AuthRoute.js";
import userRouter from "./api/routes/UserRoute.js";

const app = express();
app.use(cors({
    origin: "https://worldview-frontend.onrender.com",
    credentials: true
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

export default app;
