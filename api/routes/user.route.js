import express from "express"
import { addAndRemoveFromFavorites, bookVisit, cancelBooking, getAllBookings, getAllFavorites, getUser, updateUser } from "../controllers/user.controller.js"
import { verifyToken } from "../utils/verifytoken.js"

const router = express.Router()

//get a user
router.get("/singleuser/:id", getUser)

//update user details
router.put("/", verifyToken, updateUser)


//bookvisit
router.post("/bookvisit/:residencyId", verifyToken, bookVisit)

//cancelavisit
router.put("/:residencyId", verifyToken, cancelBooking)

//get all bookings
router.get("/allbookings", verifyToken, getAllBookings)

//favourites handling of residencies
router.put("/favorites/:residencyId", verifyToken, addAndRemoveFromFavorites)


//get all favorites residencies of logged in user
router.get("/favorites", verifyToken, getAllFavorites)
export default router

