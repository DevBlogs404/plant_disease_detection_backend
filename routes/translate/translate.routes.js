import { Router } from "express";
import { translateToHindi } from "../../controllers/translate/translate.controller.js";

const router = Router();

router.post("/translate", translateToHindi);

export default router;
