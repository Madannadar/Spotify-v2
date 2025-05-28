import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        type: String, // clerk user id 
        required: true,
    },
    receiverId: {
        type: String, // clerk user id 
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const Message = mongoose.model("Message", messageSchema);
export default Message;