import { UserInterface } from "@/interfaces/UserInterface";
import { Inject, Service } from "typedi";
import jwt from "jsonwebtoken";
import config from "@/config";
import { time } from "console";

@Service()
export default class AuthService {
  constructor(
    @Inject("userModel") private userModel: Models.userModel,
    @Inject("logger") private logger: Models.logger
  ) {}

  public async login(email: string, password: string) {
    try {
      const userData = await this.userModel.findOne({ email: email });

      if (!userData) {
        return { message: "email dosnt exist", status: 401 };
      } else if (userData.password == password) {
        const user = userData.toObject();
        Reflect.deleteProperty(user, "password");
        const token = this.generateToken(user);
        console.log(user, token);
        return { user, token, status: 200 };
      } else {
        return { message: "email and password doesn't match", status: 401 };
      }
    } catch (error) {
      error = new Error("User not found");
      error["status"] = 404;
      return error;
    }
  }

  public async forgetPassword(email: string, masterkey: string) {
    console.log(masterkey, config.masterKey);
    try {
      const userData = await this.userModel.findOne({ email: email });

      if (!userData) {
        return { message: "email dosnt exist", status: 401 };
      } else if (masterkey === config.masterKey) {
        console.log("here");
        const user = userData.toObject();
        Reflect.deleteProperty(user, "password");
        const token = this.generateToken(user, "10m");
        return { status: 200, token, message: "can reset password" };
      } else {
        return {
          status: 401,
          message: "masterkey didn't match",
        };
      }
    } catch (error) {
      if (error) throw error;
    }
  }

  private generateToken(user: UserInterface, duration: string = "1h") {
    // const today = new Date();
    // const expire = new Date(today);
    // expire.setDate(today.getDate() + 60);

    return jwt.sign(user, config.jwtSecret, { expiresIn: duration });
  }
}
