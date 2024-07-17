import dotenv from "dotenv";

dotenv.config({ path: ".env" });


//port
export const PORT = process.env.Port;

// refresh toen
export const tokenKey = process.env.tokenKey!;


//refresh toen
export const refreshTokenKey = process.env.refreshTokenKey!;


//redis password
export const redisPassword = process.env.redisPassword;

// redis host
export const redisHost = process.env.redisHost;


//cloudinary api ey
export const cloudinaryApiKey = process.env.cloudinaryApiKey;

//cloudinary api secret
export const cloudinaryApiSecret = process.env.cloudinaryApiSecret;

// cloudinary Name
export const cloudinaryName = process.env.cloudName;