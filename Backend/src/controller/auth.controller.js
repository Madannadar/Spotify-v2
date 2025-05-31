import User from "../model/user.model.js";

const authCallback = async (req, res, next) => {
    try {
        const {id, firstName, lastName, imageUrl} = req.body;

        // check if user already exists
        const user = await User.findOne({ clerkId: id });

        if(!user){
            await User.create({
                clerkId: id,
                fullName: `${firstName} ${lastName}`,
                imageUrl
            })
        }
        res.status(200).json({
            success: true,
            message: "User authenticated successfully",
        })


    } catch (error) {
        console.error("Error in auth route:", error);
        next(error);
        
    }
}

export { authCallback };