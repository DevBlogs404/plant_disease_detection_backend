import { HfInference } from "@huggingface/inference";
import dotenv from "dotenv";

dotenv.config();

const API_TOKEN = process.env.HUGGING_FACE_API_TOKEN;

const hf = new HfInference(API_TOKEN);

// function for image upload and disease detection
async function detectDisease(req, res) {
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
}

// function for detected disease details
async function getDiseaseDetails(req, res) {
  try {
    const response = await hf.textGeneration({
      // model: "mistralai/Mistral-7B-v0.1",
      model: "tiiuae/falcon-7b-instruct",
      // inputs: `you are a plant doctor, explain this disease : ${req.body.text}`,
      inputs: `you are a botanist, explain ${req.body.text} to a farmer:`,
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
}

// function for detected disease prevention
async function getDiseasePrevention(req, res) {
  try {
    const response = await hf.textGeneration({
      // model: "mistralai/Mistral-7B-v0.1",
      model: "tiiuae/falcon-7b-instruct",
      inputs: `you are a botanist, explain how to prevent ${req.body.text} to a farmer(do not return result in points):`,
    });

    // console.log(response);
    res.json(response);
  } catch (error) {
    console.error("Error generating disease info:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export { detectDisease, getDiseaseDetails, getDiseasePrevention };
