const dotenv = require('dotenv')
dotenv.config()

const mongoose = require("mongoose")
const colors = require('colors')

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.URL)
        console.log(`MongoDB connected at ${mongoose.connection.host}` .bgMagenta.white)
    } catch (error) {
        console.log(`MongoDB unable to connect. Error log: ${error}` .bgRed.white)
    }
}

module.exports = connectDB
