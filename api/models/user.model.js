import mongoose from "mongoose";

const bookedVisitsSchema = new mongoose.Schema({
    date: {
        type: String,
    },
    residencyId: {
        type: String,
    }
})

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    bookedVisits: {
        type: [bookedVisitsSchema],
        required: false,
    },
    favoriteResidencies: {
        type: [String],
        required: false,
    },
    residencies: {
        type: [String],
        required: false,
    }
}, { timestamps: true })

export default mongoose.model("User", userSchema)