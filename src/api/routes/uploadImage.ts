import { RouterPropsType } from "../types";
import { Router } from "express";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ Storage: storage });
const uploadImagesRouter = Router();
export default ({ router }: RouterPropsType) => {
  router.use("/upload", uploadImagesRouter);

  uploadImagesRouter.post(
    "/uploadImage",
    upload.single("file"),
    (req, res, next) => {
      try {
        res.status(200).json({ success: "file Upload sccessful" });
      } catch (error) {
        res.status(500).json({ error: error });
      }
    }
  );
};
