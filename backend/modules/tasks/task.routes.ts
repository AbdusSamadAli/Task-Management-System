import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { getAll, create, update, remove, toggle } from "./task.controller";

const router = Router();

router.use(authMiddleware);

router.get("/", getAll);
router.post("/", create);
router.patch("/:id", update);
router.delete("/:id", remove);
router.patch("/:id/toggle", toggle);

export default router;
