import { Router } from "express";
import { getAllAlbums, getAlbumById } from "../controller/album.controller.js";

const albumRoutes = Router();
albumRoutes.get("/", getAllAlbums) ;
albumRoutes.get("/:albumId", getAlbumById);

export default albumRoutes;