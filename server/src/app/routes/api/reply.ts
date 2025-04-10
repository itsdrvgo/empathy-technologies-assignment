import { controller } from "@/app/controllers";
import { Router } from "express";

const router = Router({ mergeParams: true });

router.get("/", controller.reply.get);
router.post("/", controller.reply.create);

export { router as replyRouter };
