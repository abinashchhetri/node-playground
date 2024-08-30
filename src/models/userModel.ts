import { UserInterface } from "@/interfaces/UserInterface";
import mongoose from "mongoose";

const user = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid email addres"],
    index: true,
  },
  password: {
    type: String,
  },
});

export default mongoose.model<UserInterface | mongoose.Document>("User", user);
