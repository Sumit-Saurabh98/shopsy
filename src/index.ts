import path from "path";
import { Request, Response } from "express";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 5002;

app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.get("/test", (req:Request, res:Response) => {
    res.send("Server is working....")
})

app.listen(PORT, () => {
    connectDB();
    console.log(`Listening on port ${PORT}`);
});