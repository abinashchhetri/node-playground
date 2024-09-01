import AuthService from "@/services/AuthService";
import { Router } from "express";
import Container from "typedi";
import { RouterPropsType } from "../types";

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

  // forget password
  authRouter.post("/forgetpassword", async (req, res, next) => {
    const { email, masterkey } = req.body;

    try {
      const authService = Container.get(AuthService);
      const serviceResponse = await authService.forgetPassword(
        email,
        masterkey
      );

      res.cookie("user", { token: serviceResponse.token });
      res.status(serviceResponse.status).json(serviceResponse.message);
    } catch (error) {
      next(error);
    }
  });
};
