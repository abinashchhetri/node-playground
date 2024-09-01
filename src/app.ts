import express from "express";
import config from "./config";
import logger from "./loaders/logger";
import "reflect-metadata";
// import Logger from "./loaders/logger";

async function startServer() {
  const server = express();
  //   loaders({ server });

  await (await import("@/loaders")).default({ server });

  server.listen(config.port, () => {
    logger.info(`app started at port ${config.port}`);
  });


}

startServer();
