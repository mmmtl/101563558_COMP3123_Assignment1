const express = require("express")
const router = express.Router()
const UserModel = require("../models/UserModel")

router.post("/signup", async (req, res) => {
    if(!req.body){
        return res.status(400).send({message: "Mssing contents of request body"})
    }

    const {username, email, password} = req.body


    try{
        const user = new UserModel({
            username: username,
            email: email,
            password: password,
            created_at: Date.now(),
            updated_at: Date.now()
        })
        
        const savedUser = await user.save()

        return res.status(201).json(savedUser)

    } catch(err){
        return res.status(500).send({message: err.message || "An error occurred in the server"})
    }
})


router.post("/login", async (req, res) => {
     if(!req.body){
        return res.status(400).send("Mssing contents of request body")
    }

    const {username, password} = req.body

    try{
        const user = await UserModel.findOne({
            username: username,
            password: password
        })

        if(user){
            return res.status(200).json(user)
        }

    } catch(err){
        return res.status(500).send({message: err.message || "An error occurred in the server"})
    }
})

module.exports = router