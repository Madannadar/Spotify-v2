import { Router } from "express";
import { protectRoute, requestAdmin } from "../middleware/auth.middleware.js";
import { createAlbum, createSong, deleteAlbum, deleteSong, checkAdmin } from "../controller/admin.controller.js";

const adminRoutes = Router();
// here we are calling the protectRoute and requestAdmin middleware before the routes are defined in every routes

//
// adminRoutes.get("/check",protectRoute, requestAdmin, checkAdmin)

// adminRoutes.post("/songs", protectRoute, requestAdmin, createSong)
// adminRoutes.delete("/songs/:id", protectRoute, requestAdmin, deleteSong)

// adminRoutes.post("/albums", protectRoute, requestAdmin, createAlbum);
// adminRoutes.delete("/albums/:id", protectRoute, requestAdmin, deleteAlbum);
//

// Protect all admin routes with the protectRoute and requestAdmin middleware
adminRoutes.use(protectRoute, requestAdmin);

adminRoutes.get("/check", checkAdmin)

adminRoutes.post("/songs",  createSong)
adminRoutes.delete("/songs/:id",  deleteSong)

adminRoutes.post("/albums",  createAlbum);
adminRoutes.delete("/albums/:id",  deleteAlbum);
export default adminRoutes;