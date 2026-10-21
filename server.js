const express = require("express")
const app = express()
const userRoutes = require("./routes/userRoutes.js")
const empRoutes = require("./routes/empRoutes.js")
const mongoose = require("mongoose")
require('dotenv').config()

const PORT = process.env.PORT || 8085
const MONGODB_URI = process.env.MONGODB_URI

app.use(express.json())


app.get("/", (req, res) => {
    res.send("<h1>COMP3123 Assignment 1 Root</h1>")
})

app.use("/api/v1/user", userRoutes)

app.use("/api/v1/emp", empRoutes)


mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log("Successfully connected to the MongoDB Atlas server")
        app.listen(PORT, () => {
            console.log(`Server is listening on port: ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
        console.log("Could not connect to the MongoDB server")
        process.exit(1)
    })

