import config from "@/config";
import Logger from "@/loaders/logger";
import {
  v2 as cloudinary,
  UploadApiOptions,
  UploadApiResponse,
} from "cloudinary";
import { error } from "console";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: config.cloudinaryName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiSecret,
});

const uploadOnCloudinary = async (localFilePath: string) => {
  try {
    if (!localFilePath) {
      const response: UploadApiResponse = await cloudinary.uploader.upload(
        localFilePath,
        {
          resource_type: "auto",
        }
      );

      //file has been uploaded successfully
      Logger.info("file has been uploaded on cloudnary : \n", response);
      return response;
    }
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the localy saved temporary file as the upload operation got failed.
    return null;
  }
};

export { uploadOnCloudinary };
