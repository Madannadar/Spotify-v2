import { Router } from "express";

const albumRoutes = Router();
albumRoutes.get("/", (req, res) => {
    res.send("Album route is arun!");
}); 

export default albumRoutes;