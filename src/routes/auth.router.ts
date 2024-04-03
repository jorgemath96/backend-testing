import { Router} from "express";
import { authenticate } from "../controllers/auth.controller";

const router = Router();

router.post("/", authenticate)

export default router;
