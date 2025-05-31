import { Router } from "express";
import { protectRoute, requestAdmin,} from "../middleware/auth.middleware.js";
import { getStatus } from "../controller/status.controller.js";
const statusRoutes = Router();

statusRoutes.get("/status", protectRoute, requestAdmin, getStatus)

export default statusRoutes;