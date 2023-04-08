const mongoose = require('mongoose');

const BookingDate = mongoose.Schema ({
    checkinDate1: {
        type: Date
    },
    checkoutDate1: {
        type: Date
    }
})

const RoomSchema = mongoose.Schema({
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true
    },
    beds: {
        type: Number,
        required: true
    },
    isBreakfastIncluded: {
        type: Boolean,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    img: {
        type: String
    },
    bookingDate: {
        checkinDate: {type: Date},
        checkoutDate: {type: Date}
    }


}, {
    timestamps: true
})


const RoomModel = mongoose.model("Room", RoomSchema);
module.exports = RoomModel;