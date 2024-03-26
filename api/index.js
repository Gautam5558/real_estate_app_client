import express, { json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import residencyRoute from "./routes/residency.route.js";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
dotenv.config();

async function connection() {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongodb");
  } catch (err) {
    throw err;
  }
}

mongoose.connection.on("disconnected", (req, res) => {
  console.log("mongodb disconnected");
});

app.listen(process.env.PORT, async (req, res) => {
  await connection();
  console.log("server is running");
});

//middlewares

app.use(json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/residencies", residencyRoute);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "There was some error";
  res.status(status).json({
    success: false,
    status: status,
    message: message,
    stack: error.stack,
  });
});
