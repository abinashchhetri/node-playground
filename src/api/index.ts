import { Router } from "express";
import auth from "./routes/auth";
import uploadImage from "./routes/uploadImage";

export default () => {
  const router = Router();
  auth({ router });
  uploadImage({ router });
  return router;
};
