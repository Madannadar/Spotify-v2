import { Router } from "express";

const songRoutes = Router();
songRoutes.get("/", (req, res) => {
    res.send("Song route is working!");
});

export default songRoutes;