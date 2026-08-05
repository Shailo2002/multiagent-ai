import mongoose from "mongoose";

const userSchme = new mongoose.Schema(
  {
    firebaseUid: { type: String, unique: true },
    name: String,
    email: String,
    avatar: String,
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchme);
export default User;
