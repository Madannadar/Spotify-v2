import Song from "../model/song.model.js";
import Album from "../model/album.model.js";
export const createSong =async (req, res) => {
    try {
        if(!req.files || !req.files.audioFile || !req.files.imageFile) {
            return res.status(400).json({ message: "Audio file and image file are required" });
        }

        const { title, artist, albumId, duration } = req.body;
        const audioFile = req.files.audioFile;
        const imageFile = req.files.imageFile;

        const song = new Song({
            title,
            artist,
            duration,
            audioUrl: audioFile.path, // Assuming the file path is stored in the path property
            imageUrl: imageFile.path, // Assuming the file path is stored in the path property
            albumId: albumId || null,
        })

        await song.save();
        // if song belongs to an album, update the album's songs array
        if(albumId){
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
        res.status(500).json({ message: "Internal server error" });
    }
}