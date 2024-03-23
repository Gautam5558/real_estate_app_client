import { createError } from "./createError.js"
import jwt from "jsonwebtoken"


export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token
    if (!token) {
        return next(createError(400, "you're not logged in"))
    }

    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if (err) {
            return next(err)
        }

        req.user = user
        next()
    })
}


export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (!req.user.isAdmin) {
            return next(createError(400, "Permission denied"))
        }

        next()
    })
}