import { controller } from "@/app/controllers";
import { Router } from "express";
import { commentRouter } from "./comment";

const router = Router();

router.get("/", controller.media.paginate);
router.get("/:media_id", controller.media.get);

router.use("/:media_id/comments", commentRouter);

export { router as mediaRouter };
