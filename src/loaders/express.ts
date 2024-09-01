import { Application, json, urlencoded } from "express";
import Logger from "./logger";
import api from "@/api";
import cookieParser from "cookie-parser";

import cors from "cors";

export type ExpressLoaderType = {
  server: Application;
};

export default ({ server }: ExpressLoaderType) => {
  server.get("/status", (req, res) => {
    res.status(200).end();
  });

  server.use(json());
  server.use(cors());
  server.use(urlencoded({ extended: true }));
  server.use(cookieParser());
  server.use("/api", api());

  server.use((req, res, next) => {
    const error = new Error("Resource Not Found");
    error["status"] = 404;
    next(error);
  });

  server.use((error, req, res, next) => {
    Logger.error(error.message);
    res.status(error.status || 500).json({ message: error.message });
  });
};
