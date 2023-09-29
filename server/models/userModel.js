const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            min: 4,
            unique: [true, "Username is required"]
        },
        password: {
            type: String,
            required: [true, "Password is required"]
        },
    },
    { timestamps : true}
);

const userModel = mongoose.model("user", userSchema)
module.exports = userModel