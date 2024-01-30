import { Router } from "express";
import multer from "multer";
import {
  getDiseaseDetails,
  getDiseasePrevention,
  detectDisease,
} from "../../controllers/disease/disease.controller.js";

const router = Router();

// Set up Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/image-upload", upload.single("image"), detectDisease);
router.post("/disease-info", getDiseaseDetails);
router.post("/disease-prevention", getDiseasePrevention);

export default router;
