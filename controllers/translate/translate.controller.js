import { HfInference } from "@huggingface/inference";
import dotenv from "dotenv";

dotenv.config();

const API_TOKEN = process.env.HUGGING_FACE_API_TOKEN;

const hf = new HfInference(API_TOKEN);

async function translateToHindi(req, res) {
  try {
    const { text } = req.body;

    const response = await hf.translation({
      model: "facebook/mbart-large-50-many-to-many-mmt",
      inputs: text,
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
}

export { translateToHindi };
