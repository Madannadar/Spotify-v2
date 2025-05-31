import  Song  from '../model/song.model.js';
import  User  from '../model/user.model.js';
import  Album  from '../model/album.model.js';

export const getStatus = async(req, res, next) => {
    try {
        // const totalSongs = await Song.countDocuments();
        // const  totalUsers = await User.countDocuments();
        // const totalAlbums = await Album.countDocuments();

        //tis is the same as above but using Promise.all to run all queries in parallel
        const[ totalSongs, totalAlbums, totalUsers, uniqueArtists] = await promise.all([
            Song.countDocuments(),
            User.countDocuments(),
            Album.countDocuments(),
            Song.aggregate([
                { $unionWith: {
                    coll: "ablums",
                    pipeline: []
                    }
                },
                {
                    $group: {
                        _id: "$artist",
                    }
                },
                {
                    $count: "count"
                }
            ])
        ])

        res.status(200).json({
            success: true,
            message: "Status fetched successfully",
            data: {
                totalSongs,
                totalAlbums,
                totalUsers,
                uniqueArtists: uniqueArtists[0]?.count || 0 // if no artists found, return 0
            }})
    } catch (error) {
        console.error("Error in status route:", error);
        next(error);
        
    }
}