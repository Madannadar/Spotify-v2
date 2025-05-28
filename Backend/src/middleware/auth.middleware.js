import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
    if(!req.auth.userId){
        return res.status(401).json({
            success: false,
            message: "Unauthorized access. Please log in."

        });
    }
    next();
};

export const requestAdmin = async(req, res, next) => {
    try {
        const currentUser = await clerkClient.users.getUser(req.auth.userId);
        const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

        if(!isAdmin) {
            return res.status(403).json({
                success: false,
                message: "Forbidden. You do not have admin access."
            });
        }

        next();

    } catch (error) {
        console.error("Error in admin route:", error);
        res.status(500).send("Internal Server Error");
    }
}