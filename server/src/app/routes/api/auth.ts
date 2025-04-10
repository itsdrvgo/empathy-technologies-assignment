import { controller } from "@/app/controllers";
import { middlewares } from "@/app/middlewares";
import { Router } from "express";

const router = Router();

router.get("/", controller.auth.redirect);
router.get("/callback", controller.auth.callback);
router.get("/me", middlewares.auth, controller.auth.me);

export { router as authRouter };
