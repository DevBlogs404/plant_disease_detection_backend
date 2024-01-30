import express from "express";
import { HfInference } from "@huggingface/inference";
import multer from "multer";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const API_TOKEN = process.env.HUGGING_FACE_API_TOKEN;

const hf = new HfInference(API_TOKEN);

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;

// Set up Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// API endpoint for image upload
app.post("/image-upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image provided" });
    }

    const response = await hf.imageClassification({
      model: "A2H0H0R1/mobilenet_v2_1.0_224-plant-disease2",
      data: req.file.buffer, // Use the buffer of the uploaded file
    });

    // You can send the response back to the frontend or handle it accordingly
    res.json(response);
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/disease-info", async (req, res) => {
  try {
    const response = await hf.textGeneration({
      // model: "mistralai/Mistral-7B-v0.1",
      model: "tiiuae/falcon-7b-instruct",
      // inputs: `you are a plant doctor, explain this disease : ${req.body.text}`,
      inputs: `explain ${req.body.text} in 3 points to a farmer:`,
      parameters: {
        max_new_tokens: 250,
      },
    });

    // console.log(response);
    res.json(response);
  } catch (error) {
    console.error("Error generating disease info:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/disease-prevention", async (req, res) => {
  try {
    const response = await hf.textGeneration({
      // model: "mistralai/Mistral-7B-v0.1",
      model: "tiiuae/falcon-7b-instruct",
      inputs: `explain how to prevent ${req.body.text} in 3 points to a farmer:`,
    });

    // console.log(response);
    res.json(response);
  } catch (error) {
    console.error("Error generating disease info:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/translate", async (req, res) => {
  try {
    const response = await hf.translation({
      model: "facebook/mbart-large-50-many-to-many-mmt",
      inputs: req.body.text,
      parameters: {
        src_lang: "en_XX",
        tgt_lang: "hi_IN",
      },
    });

    // console.log(response);
    res.json(response);
  } catch (error) {
    console.error("Error generating disease info:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
