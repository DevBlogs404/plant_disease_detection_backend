import express from "express";
import { HfInference } from "@huggingface/inference";
import dotenv from "dotenv";
import cors from "cors";

import diseaseRoutes from "./routes/disease/disease.routes.js";
import translateRoutes from "./routes/translate/translate.routes.js";

dotenv.config();

const app = express();

//middlewares
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

//routes
app.use("/api/v1", diseaseRoutes);
app.use("/api/v1", translateRoutes);

const port = process.env.PORT || 4949;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
