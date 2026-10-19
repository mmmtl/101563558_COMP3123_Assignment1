const express = require("express")
const app = express()
const userRoutes = require("./routes/userRoutes.js")

app.use(express.json())


app.get("/", (req, res) => {
    res.send("<h1>COMP3123 Assignment 1 Root</h1>")
})

app.use("/api/v1/user", userRoutes)

app.use("/api/v1/emp", empRoutes)