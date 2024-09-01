import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT,
  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },
  mongoApi: process.env.DATABASE_API,
  jwtSecret: process.env.JWT_SECRET,
  jwtAlgorithm: process.env.JWT_ALGO,
  cloudinaryName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: process.env.CLOOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOOUDINARY_API_SECRET,
  masterKey: process.env.MASTERKEY,
};
