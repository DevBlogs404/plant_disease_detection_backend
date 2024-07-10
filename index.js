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
app.use(
  cors({
    origin: "*",
  })
);

//routes
app.use("/api/v1", diseaseRoutes);
app.use("/api/v1", translateRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});

app.use("/", (req, res) => {
  res.send("App running successfully");
});
