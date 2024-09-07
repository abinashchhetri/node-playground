import upload from "@/middlewares/multer.middleware";
import { Router } from "express";
import { RouterPropsType } from "../types";

const uploadImagesRouter = Router();

export default ({ router }: RouterPropsType) => {
  router.use("/upload", uploadImagesRouter);

  uploadImagesRouter.post(
    "/uploadImage",
    upload.fields([
      { name: "images", maxCount: 10 }, // 'images' can accept up to 10 files
      { name: "coverPhoto", maxCount: 1 }, // 'coverPhoto' accepts only 1 file
    ]),
    (req, res, next) => {
      const { titile, category } = req.body;
      const files = req.files as { [fieldName: string]: Express.Multer.File[] };

      const photos = files.images;
      console.log(photos);
      photos.map((file) => {
        console.log(file.originalname);
        console.log(file.filename);
      });

      try {
        res.status(200).json({ success: "file Upload sccessful" });
      } catch (error) {
        res.status(500).json({ error: error });
      }
    }
  );
};
