import { Router } from "express";
import { authCallback } from "../controller/auth.controller.js";

const authRoutes = Router();
authRoutes.post("/callback",authCallback)

export default authRoutes;