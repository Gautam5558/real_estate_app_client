
import User from "../models/user.model.js"
import Residency from "../models/residency.model.js"

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, isAdmin, ...otherProps } = user._doc
        res.status(200).json(otherProps)
    } catch (err) {
        next(err)
    }
}

export const bookVisit = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        if (user.bookedVisits.some((visit) => { return visit.residencyId === req.params.residencyId })) {
            res.status(400).json("You've already booked this residency")
        }
        else {
            await User.updateOne({ _id: req.user.id }, { $push: { bookedVisits: { residencyId: req.params.residencyId, date: req.body.date } } })
            const residency = await Residency.findByIdAndUpdate(req.params.residencyId, { $push: { unavailableDates: req.body.unavailable } })
            res.status(200).json("Residency has been booked by you")
        }




    } catch (err) {
        next(err)
    }
}

export const cancelBooking = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        if (user.bookedVisits.some((visit) => { return visit.residencyId === req.params.residencyId })) {
            const visit = user.bookedVisits.find((visit) => { return visit.residencyId === req.params.residencyId })
            const date = visit.date


            const array = date.split("/")
            const day = Number(array[0])
            const month = Number(array[1])
            const year = Number(array[2])

            const newDate = {
                year,
                month,
                day
            }

            await Residency.findByIdAndUpdate(req.params.residencyId, { $pull: { unavailableDates: { day: newDate.day, month: newDate.month, year: newDate.year } } })

            await User.findByIdAndUpdate(req.user.id, { $pull: { bookedVisits: { residencyId: req.params.residencyId } } })

            res.status(200).json("Booking cancelled")
        }
        else {

            res.status(400).json("Booking not found")
        }
    } catch (err) {
        next(err)
    }
}

export const getAllBookings = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.user.id })
        res.status(200).json(user.bookedVisits)

    } catch (err) {
        next(err)
    }
}


export const addAndRemoveFromFavorites = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        if (user.favoriteResidencies.some((residency) => { return residency === req.params.residencyId })) {
            await User.findByIdAndUpdate(req.user.id, { $pull: { favoriteResidencies: req.params.residencyId } })
            res.status(200).json("Removed from favorites")
        } else {
            await User.findByIdAndUpdate(req.user.id, { $push: { favoriteResidencies: req.params.residencyId } })
            res.status(200).json("Added to favorites")
        }
    } catch (err) {
        next(err)
    }
}


export const getAllFavorites = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        res.status(200).json(user.favoriteResidencies)
    } catch (err) {
        next(err)
    }
}

export const updateUser = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, { ...req.body })
        res.status(200).json("Updated successfully")
    } catch (err) {
        next(err)
    }
}