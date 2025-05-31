import { Router } from "express";
import { getAllSongs, getFeaturedSongs, getMadeForYouSongs, getTrendingSongs } from "../controller/songs.controller.js";
import { protectRoute, requestAdmin } from "../middleware/auth.middleware.js";

const songRoutes = Router();
songRoutes.get("/",protectRoute, requestAdmin, getAllSongs);
songRoutes.get("/featured", getFeaturedSongs);
songRoutes.get("/made-for-you", getMadeForYouSongs);
songRoutes.get("/trending", getTrendingSongs);

export default songRoutes;