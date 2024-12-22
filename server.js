import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./config/db.js";
import UrlRouter from "./routes/url.routes.js";
import customRateLimiter from './utils/limter.js'

dotenv.config();
const app = express();

const PORT = process.env.BASE_URL || 8000;

//all incoming requests will be parsed to json
app.use(express.json());

// Trust the first proxy
// app.set('trust proxy', 1);

//limit requests to 1000 per hour
app.use(customRateLimiter);


//url routes
app.use("/", UrlRouter);

app.listen(PORT, async () => {
  await connectToDB();
  console.log(`Server is running on port ${PORT}`);
});
