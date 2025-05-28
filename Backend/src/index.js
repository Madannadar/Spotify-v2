import express from 'express';
import dotenv from 'dotenv';
import { clerkMiddleware } from "@clerk/express";
import { connectDB } from './lib/db.js';
import fileUpload from 'express-fileupload';
import path from 'path';

import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import adminRoutes from './routes/admin.route.js';
import songRoutes from './routes/song.route.js';
import albumRoutes from './routes/album.route.js';
import statusRoutes from './routes/status.route.js';

dotenv.config();
connectDB();

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON bodies
app.use(clerkMiddleware()); // this will add auth to req obj => will let me do req.auth.userId to get the user id of the logged in user
app.use(fileUpload(
    {
        useTempFiles: true, // Use temporary files for uploads
        tempFileDir:path.join(__dirname, "temp"), // Directory to store temporary files
        createParentPath: true, // Create parent directories if they don't exist
        limits: {
            fileSize: 10 * 1024 * 1024, // Limit file size to 10MB
        },
    }
))

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/album", albumRoutes);
app.use("/api/status", statusRoutes);

app.listen(5000, () => {
    console.log(`Server is running on port ${PORT}`);
})