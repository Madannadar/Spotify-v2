import User from "../model/user.model.js";

export const getAllUsers = async (req, res, next) =>{
    try {
        const currentUserId = req.auth.userId;
        const users = await User.find({clerkId: {$ne: currentUserId}}) // $ne means not equal
        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            users,
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        next(error);
        
    }
}