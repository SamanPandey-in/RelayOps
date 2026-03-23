import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { search } from "../controllers/search.controller.js";

const router = Router();

router.use(authenticate);
router.get("/", search);

export default router;
