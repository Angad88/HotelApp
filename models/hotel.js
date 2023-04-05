const mongoose = require('mongoose');


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
    }


}, {
    timestamps: true
})


const RoomModel = mongoose.model("Room", RoomSchema);
module.exports = RoomModel;