import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { generateToken, setCookies } from "../helper/authenticationHelper.js";


export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(401).json({ message: "User already exists" });
    }

    const newUser = await User.create({ name, email, password });

    // authenticate
    const { accessToken, refreshToken } = generateToken(newUser._id.toString());

    setCookies(res, accessToken, refreshToken);

    res.status(201).json({
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      message: "Account created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error: " + error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const { accessToken, refreshToken } = generateToken(user._id.toString());
    setCookies(res, accessToken, refreshToken);
    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: "Logged in successfully",
    });
  } catch (error) {
    console.log("Error in login:", error);
    res.status(500).json({ message: "Internal server error: " + error });
  }
};

export const logout = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies._shopsy_refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ message: "Unauthorized user" });
        }

        const decode = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as jwt.JwtPayload;
        res.clearCookie("_shopsy_accessToken");
        res.clearCookie("_shopsy_refreshToken");
        res.status(200).json({ message: "Logged out successful" });
    } catch (error) {
        console.log("Error in logout:", error);
        res.status(500).json({ message: "Internal server error: " + error });
    }
};

export const refreshAccessToken = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies._shopsy_refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ message: "Unauthorized user" });
        }
        const decode = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as jwt.JwtPayload;

        const { accessToken } = generateToken(decode._id.toString());
        setCookies(res, accessToken, refreshToken);
        res.status(200).json({ message: "Token refreshed successfully", accessToken });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error: " + error });
    }
};

export const getProfile = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        res.status(200).json({ user });
    } catch (error) {
        console.log("Error in getting profile:", error);
        res.status(500).json({ message: "Internal server error: " + error });
    }
};
