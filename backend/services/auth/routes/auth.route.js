import express from "express";
import { checkRoute, login } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", login);
router.get("/login", checkRoute);

export default router;
