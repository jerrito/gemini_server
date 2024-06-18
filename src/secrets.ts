import dotenv from "dotenv";

dotenv.config({path:".env"});

export const PORT=process.env.Port;

export const tokenKey=process.env.tokenKey!;

export const refreshTokenKey=process.env.refreshTokenKey!;


export const cloudinaryApiKey=process.env.cloudinaryApiKey;

export const cloudinaryApiSecret=process.env.cloudinaryApiSecret;