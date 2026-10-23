import { Router } from "express";
import  Services from "./auth.services.js"
import { authMiddleware, verifyMiddleware } from "../MIddleware/authorization.js";
import upload from "../config/multer.js";

const router = Router()


router.post("/", Services.signUp)
router.post("/login", Services.login)
router.get("/me", authMiddleware, Services.me) // v1/login, v1/me
router.patch("/verifyEmail", verifyMiddleware, Services.verifyEmail) 
router.patch("/me", authMiddleware, upload.single("file"), Services.updateUser) 

export default router