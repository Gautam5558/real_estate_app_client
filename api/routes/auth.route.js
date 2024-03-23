import express from "express"
import { login, logout, register } from "../controllers/auth.controller.js"

const router = express.Router()

//register
router.post("/register", register)


//login
router.post("/login", login)


//logout
router.post("/logout", logout)

export default router