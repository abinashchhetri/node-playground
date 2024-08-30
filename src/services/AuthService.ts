import { UserInterface } from "@/interfaces/UserInterface";
import { Inject, Service } from "typedi";
import jwt from "jsonwebtoken";
import config from "@/config";

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

  private generateToken(user: UserInterface) {
    // const today = new Date();
    // const expire = new Date(today);
    // expire.setDate(today.getDate() + 60);

    return jwt.sign(user, config.jwtSecret, { expiresIn: "1h" });
  }
}
