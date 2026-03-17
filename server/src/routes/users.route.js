import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { getMyProfile, updateMyProfile } from "../controllers/users.controller.js";

const router = Router();

router.use(authenticate);
router.get("/me", getMyProfile);
router.patch("/me", updateMyProfile);

export default router;
