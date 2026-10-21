const mongoose = require("mongoose")
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minglength: 8
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    }
})


module.exports = mongoose.model("User", UserSchema)