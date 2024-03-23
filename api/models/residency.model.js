import mongoose from "mongoose";

const calendarDateSchema = new mongoose.Schema({
    year: {
        type: String
    },
    month: {
        type: String
    },
    day: {
        type: String
    }
})

const residencySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    desc: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
        unique: true,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
    bathrooms: {
        type: Number,
        required: true,
    },
    rooms: {
        type: Number,
        required: true,
    },
    parking: {
        type: Boolean,
        default: false
    },
    userId: {
        type: String,
        required: true
    },
    unavailableDates: {
        type: [calendarDateSchema]
    }
}, { timestamps: true })

export default mongoose.model("Residency", residencySchema)