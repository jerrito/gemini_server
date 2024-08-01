import dotenv from "dotenv";

dotenv.config({ path: ".env" });

// firebase key
export const firebaseKey=process.env.firebaseKey;
//port
export const PORT = process.env.Port;

// refresh token
export const tokenKey = process.env.tokenKey!;


//refresh token
export const refreshTokenKey = process.env.refreshTokenKey!;


//redis password
export const redisPassword = process.env.redisPassword;

// redis host
export const redisHost = process.env.redisHost;

//redis port
export const redisPort = process.env.redisPort;
//cloudinary api ey
export const cloudinaryApiKey = process.env.cloudinaryApiKey;

//cloudinary api secret
export const cloudinaryApiSecret = process.env.cloudinaryApiSecret;

// cloudinary Name
export const cloudinaryName = process.env.cloudName;