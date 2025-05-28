import { Router } from "express";

const userRoutes = Router();

userRoutes.get("/", (req, res) => {
    res.send("User route is working!");
})

export default userRoutes;
