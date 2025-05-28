import { Router } from "express";

const authRoutes = Router();
authRoutes.get("/", (req, res) => {
    res.send("Auth route is working!");
})

export default authRoutes;