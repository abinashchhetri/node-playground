import { RouterPropsType } from "../types";
import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

// const uploadDir = path.resolve(__dirname, "../../upload");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, path.resolve(__dirname, "../../upload"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-";
    return cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const uploadImagesRouter = Router();

export default ({ router }: RouterPropsType) => {
  router.use("/upload", uploadImagesRouter);

  uploadImagesRouter.post(
    "/uploadImage",
    upload.single("jasu"),
    (req, res, next) => {
      try {
        res.status(200).json({ success: "file Upload sccessful" });
      } catch (error) {
        res.status(500).json({ error: error });
      }
    }
  );
};
