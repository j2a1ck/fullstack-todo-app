import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import taskControllers from "./controllers/taskControllers.js";
import userControllers from "./controllers/userControllers.js";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import jwt from "jsonwebtoken";

dotenv.config()

// Validate environment variables
if (!process.env.PORT || !process.env.MONGODB_URI) {
  throw new Error("Required environment variables are missing");
}

const app = express();
const port = process.env.PORT;
console.log(port)

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: "Too many requests from this IP, please try again after a minute.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware
app.use(cors());
app.use(express.json());
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]
  if (!token) return res.status(401).json({ error: "Unauthorized" })

  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) return res.status(401).json({ error: "Invalid token" })
    req.user = { id: decode.userId };
    next();
  })
}

// Routes
app.use("/api/v1/users", userControllers);
app.use("/api/v1/tasks", verifyToken, taskControllers);

const server = app
  .listen(port, () => {
    connectDB();
    console.log(`Server running on port ${port}`);
  })
  .on("error", (err) => {
    if (err.code === "EACCES") {
      console.error(`Port ${port} requires elevated privileges`);
    } else if (err.code === "EADDRINUSE") {
      console.error(`Port ${port} is already in use`);
    } else {
      console.error(err);
    }
    process.exit(1);
  });
