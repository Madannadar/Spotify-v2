import  Song  from '../model/song.model.js';
export const getAllSongs = async (req, res, next) => {
    try {
        const songs = await Song.find().sort({createdAt: -1}) 
        res.json({
            success: true,
            message: "Songs fetched successfully",
            songs,
        });
    } catch (error) {
        console.error("Error fetching songs:", error);
        next(error);
    }
}

export const getFeaturedSongs = async (req, res, next) => {
    try {
        // fetch 6 random songs from the database
        const songs = await Song.aggregate([ // aggregation pipeline to fetch random songs
            { $sample: { size: 6 } },
            { $project: {
                id: 1,
                title: 1,
                artist: 1,
                imageUrl: 1,
                audiourl: 1,
                } 
            }
        ])

        res.status(200).json({
            success: true,
            message: "Featured songs fetched successfully",
            songs,
        });
    } catch (error) {
        console.error("Error fetching featured songs:", error);
        next(error);
        
    }
}

export const getMadeForYouSongs = async (req, res, next) => {
    try {
        // fetch 4 random songs from the database
        const songs = await Song.aggregate([ // aggregation pipeline to fetch random songs
            { $sample: { size: 4 } },
            { $project: {
                id: 1,
                title: 1,
                artist: 1,
                imageUrl: 1,
                audiourl: 1,
                } 
            }
        ])

        res.status(200).json({
            success: true,
            message: "Made for you songs fetched successfully",
            songs,
        });
    } catch (error) {
        console.error("Error fetching made for you songs:", error);
        next(error);
        
    }
}

export const getTrendingSongs = async (req, res, next) => {
    try {
        // fetch 6 random songs from the database
        const songs = await Song.aggregate([ // aggregation pipeline to fetch random songs
            { $sample: { size: 4 } },
            { $project: {
                id: 1,
                title: 1,
                artist: 1,
                imageUrl: 1,
                audiourl: 1,
                } 
            }
        ])

        res.status(200).json({
            success: true,
            message: "Trending songs fetched successfully",
            songs,
        });
    } catch (error) {
        console.error("Error fetching trending songs:", error);
        next(error);
        
    }
}