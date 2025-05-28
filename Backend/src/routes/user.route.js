import { Router } from "express";

const userRoutes = Router();

userRoutes.get("/", (req, res) => {
    req.auth.userId
    res.send("User route is working!");
})

export default userRoutes;
