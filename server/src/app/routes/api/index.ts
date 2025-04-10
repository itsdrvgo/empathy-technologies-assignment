import { middlewares } from "@/app/middlewares";
import { Router } from "express";
import { authRouter } from "./auth";
import { mediaRouter } from "./media";

const router = Router();

router.use("/auth", authRouter);
router.use("/media", middlewares.auth, mediaRouter);

export { router as apiRouter };
