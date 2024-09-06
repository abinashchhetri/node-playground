import upload from "@/middlewares/multer.middleware";
import { Router } from "express";
import { RouterPropsType } from "../types";
import multer from "multer";

const uploadImagesRouter = Router();

export default ({ router }: RouterPropsType) => {
  router.use("/upload", uploadImagesRouter);

  uploadImagesRouter.post(
    "/uploadImage",
    upload.array("jasu"),
    (req, res, next) => {
      const photos = req.files as Express.Multer.File[];

      photos.map((file) => {
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
