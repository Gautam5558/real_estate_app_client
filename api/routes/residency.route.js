import express from "express"
const router = express.Router()
import { createResidency, getResidencies, getResidency } from "../controllers/residency.controller.js"
import { verifyAdmin } from "../utils/verifytoken.js"

//get residency
router.get("/:id", getResidency)

//create residency
router.post("/", verifyAdmin, createResidency)

//get all residencies
router.get("/", getResidencies)

//book a 




export default router

