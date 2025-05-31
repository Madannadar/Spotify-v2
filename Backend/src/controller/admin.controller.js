import Song from "../model/song.model.js";
import Album from "../model/album.model.js";
import cloudinary from "../lib/cloudinary.js"; 
import { log } from "console";

const uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: "auto", // Automatically determine the resource type (image, video, etc.)
            folder: "songs", // Specify the folder in Cloudinary where the file will be uploaded
        })
        return result.secure_url; // Return the secure URL of the uploaded file
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        throw new Error("Failed to upload file");
    }
}

export const createSong = async (req, res, next) => {
    try {
        if (!req.files || !req.files.audioFile || !req.files.imageFile) {
            return res.status(400).json({ message: "Audio file and image file are required" });
        }

        const { title, artist, albumId, duration } = req.body;
        const audioFile = req.files.audioFile;
        const imageFile = req.files.imageFile;

        const audioUrl = await uploadToCloudinary(audioFile);
        const imageUrl = await uploadToCloudinary(imageFile);

        const song = new Song({
            title,
            artist,
            duration,
            audioUrl,// Assuming the file path is stored in the path property
            imageUrl, // Assuming the file path is stored in the path property
            albumId: albumId || null,
        })

        await song.save();
        // if song belongs to an album, update the album's songs array
        if (albumId) {
            await Album.findByIdAndUpdate(
                albumId,
                { $push: { songs: song._id } },
                { new: true }
            );
        }
        res.status(201).json({
            success: true,
            message: "Song created successfully",
            song,
        });

    } catch (error) {
        console.error("Error creating song:", error);
        next(error)
    }
}

export const deleteSong = async (req, res, next) => {
    try {
        const { id } = req.params;
        const song = await Song.findById(id);

        if(song.albumId){
            await Album.findByIdAndUpdate(
                song.albumId,
                { $pull: { songs: song._id } },
                { new: true }
            );
        }
        await Song.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Song deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting song:", error);
        next(error); 
    }
}

export const createAlbum = async (req, res, next) => {
    try {
        const { title, artist, releaseYear} = req.body;
        const {imageFile} = req.files;

        const imageUrl = await uploadToCloudinary(imageFile);
        const album = new Album({
            title,
            artist,
            releaseYear,
            imageUrl, // Assuming the file path is stored in the path property
        });

        await album.save();
        res.status(201).json({
            success: true,
            message: "Album created successfully",
            album,
        });

    } catch (error) {
        console.error("Error creating album:", error);
        next(error);
    }
}

export const deleteAlbum = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Album.findByIdAndDelete(id);
        await Song.deleteMany({ albumId: id });
        res.status(200).json({
            success: true,
            message: "Album deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting album:", error);
        next(error);
    }
}

export const checkAdmin = async(req, res, next) => {
    res.status(200).json({ admin: true, message: "You are an admin" });
}