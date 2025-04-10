import { controller } from "@/app/controllers";
import { Router } from "express";
import { replyRouter } from "./reply";

const router = Router({ mergeParams: true });

router.get("/", controller.comment.paginate);
router.get("/:comment_id", controller.comment.get);
router.post("/", controller.comment.create);

router.use("/:comment_id/replies", replyRouter);

export { router as commentRouter };
