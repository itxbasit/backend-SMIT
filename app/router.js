import { Router } from "express";
import auth from "./auth/auth.router.js";

const router = Router()


router.use("/auth", auth) // v1/auth

export default router
