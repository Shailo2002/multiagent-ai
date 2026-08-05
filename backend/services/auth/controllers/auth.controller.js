import { app } from "../config/firebase.js";
import { getAuth } from "firebase-admin/auth";
import User from "../models/user.model.js";

export const login = async (req, res) => {
  try {
    console.log("auth service controller");
    const { token } = req.body;
    console.log("token : ", token);
    const decoded = await getAuth(app).verifyIdToken(token);
    console.log("decoded user : ", decoded);
    let user = await User.findOne({ where: { firebaseUid: decoded.uid } });

    if (!user) {
      user = await User.create({
        firebaseUid: decoded.uid,
        email: decoded.email,
        name: decoded.name,
        avatar: decoded.picture,
      });
    }

    const sessionId = crypto.randomUUID();

    res.cookie("session", sessionId, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message || "login error " });
  }
};

export const checkRoute = (req, res) => {
  res.status(200).json({ message: "auth service controller check" });
};
