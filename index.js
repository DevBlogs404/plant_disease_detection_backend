import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import diseaseRoutes from "./routes/disease/disease.routes.js";
import translateRoutes from "./routes/translate/translate.routes.js";

dotenv.config();

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", (req, res) => {
  res.send("App running successfully");
});

//routes
app.use("/api/v1", diseaseRoutes);
app.use("/api/v1", translateRoutes);

const port = process.env.PORT || 4949;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
