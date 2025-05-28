import { Router } from "express";

const adminRoutes = Router();
adminRoutes.get("/", (req, res) => {
    res.send("Admin route is working!");
});

export default adminRoutes;