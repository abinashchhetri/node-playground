import { UserInterface } from "@/interfaces/UserInterface";
import { Document, Model } from "mongoose";
import winston from "winston";

declare global {
  namespace Models {
    export type userModel = Model<UserInterface & Document>;
    export type logger = winston.Logger;
  }
}
