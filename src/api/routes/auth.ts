import { Router } from "express";
import { RouterPropsType } from "../types";
import AuthService from "@/services/AuthService";
import userModel from "@/models/userModel";
import Container from "typedi";
import { error } from "console";
import Logger from "@/loaders/logger";

const authRouter = Router();
export default ({ router }: RouterPropsType) => {
  router.use("/auth", authRouter);

  authRouter.get("/jasu", (req, res, next) => {
    res.json("hello form auth");
  });

  authRouter.post("/login", async (req, res, next) => {
    const { email, password } = req.body;
    console.log(email, password);

    try {
      const authService = Container.get(AuthService);

      const data = await authService.login(email, password);
      res.status(data.status).json(data);
    } catch (e) {
      next(e);
    }
  });
};
