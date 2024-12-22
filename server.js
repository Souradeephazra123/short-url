import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./config/db.js";
import UrlRouter from "./routes/url.routes.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8000;

//all incoming requests will be parsed to json
app.use(express.json());

//limit requests to 1000 per hour
// app.use(limiter);

//url routes
app.use("/", UrlRouter);
app.get("/", (req, res) => {
  res.send("Welcome to URL shortener API");
  console.log("Welcome to URL shortener API");
});

app.listen(PORT, async () => {
  await connectToDB();
  console.log(`Server is running on port ${PORT}`);
}).setTimeout(10000);
