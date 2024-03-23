import Residency from "../models/residency.model.js"
import User from "../models/user.model.js"
import { createError } from "../utils/createError.js"

export const getResidency = async (req, res, next) => {
    try {
        const residency = await Residency.findById(req.params.id)
        if (!residency) {
            return next(createError(400, "residency doesn't exist"))
        }
        res.status(200).json(residency)
    }
    catch (err) {
        next(err)
    }
}

export const createResidency = async (req, res, next) => {
    const residency = new Residency({
        ...req.body,
        userId: req.user.id
    })
    try {
        const data = await residency.save()
        await User.updateOne({ _id: req.user.id }, { $push: { residencies: data._id } })
        res.status(200).json(residency)
    } catch (err) {
        next(err)
    }
}

export const getResidencies = async (req, res, next) => {
    try {
        const residencies = await Residency.find().sort({ createdAt: "desc" })
        res.status(200).json(residencies)
    } catch (err) {
        next(err)
    }
}