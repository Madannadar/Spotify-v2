import { Router } from "express";

const statusRoutes = Router();
statusRoutes.get("/", (req, res) => {
    res.send("Status route is working!");
})

export default statusRoutes;