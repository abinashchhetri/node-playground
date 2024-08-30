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
};
