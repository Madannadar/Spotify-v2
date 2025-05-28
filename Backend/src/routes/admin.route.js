import { Router } from "express";
import { protectRoute, requestAdmin } from "../middleware/auth.middleware.js";
import { createSong } from "../controller/admin.controller.js";

const adminRoutes = Router();

adminRoutes.get("/songs", protectRoute, requestAdmin, createSong)

export default adminRoutes;