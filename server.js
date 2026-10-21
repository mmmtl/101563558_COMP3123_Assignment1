const express = require("express")
const app = express()

const userRoutes = require("./routes/userRoutes.js")
const empRoutes = require("./routes/empRoutes.js")

const mongoose = require("mongoose")
const env = require("dotenv").config()

const PORT = process.env.PORT || 8085
const MONGODB_URI = env.MONGODB_URI
// DB_LOCAL_URI = "mongodb://127.0.0.1:27018/comp3123_assignment1"

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

