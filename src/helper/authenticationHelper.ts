import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import redis from "../lib/redis.js";
import { Response } from "express";

export const generateToken = (
  _id: string
): { accessToken: string; refreshToken: string } => {
  const accessToken = jwt.sign({ _id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ _id }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

export const storeRefreshToken = async (
  _id: string,
  refreshToken: string
): Promise<void> => {
  await redis.set(`refreshToken:${_id}`, refreshToken, "EX", 60 * 60 * 24 * 7);
};

export const setCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string
): void => {
  res.cookie("_shopsy_accessToken", accessToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0.5 * 60 * 1000,
  });

  res.cookie("_shopsy_refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  console.log("seted both the cookies")
};