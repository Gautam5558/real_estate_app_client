import User from "../models/user.model.js"
import { createError } from "../utils/createError.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const register = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            return next(createError(400, "User exists with this email"))
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            ...req.body,
            password: hash
        })

        await newUser.save()
        res.status(200).json("You're registered")

    } catch (err) {
        next(err)
    }
}


export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return next(createError(400, "No user exists with this email"))
        }

        const check = bcrypt.compareSync(req.body.password, user.password);
        if (!check) {
            return next(createError(400, "password is wrong for the given email"))
        }

        const token = jwt.sign({ isAdmin: user.isAdmin, id: user._id }, process.env.JWT_KEY)

        const { password, ...otherProperties } = user._doc
        res.cookie("access_token", token, { httpOnly: true, path: "/" }).status(200).json(otherProperties)

    } catch (err) {
        next(err)
    }
}

export const logout = (req, res, next) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200)
}