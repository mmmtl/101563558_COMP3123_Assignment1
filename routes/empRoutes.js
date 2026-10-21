const express = require("express")
const router = express.Router()
const EmpModel = require("../models/EmpModel")
const { ObjectId } = require('mongodb')


// GET all employees
router.get("/employees", async (req, res) => {
    try{
        const employees = await EmpModel.find()
        return res.status(200).json(employees)

    } catch(err){
        return res.status(500).send({message: err.message || "An error occurred in the server"})
    }
})

// POST create an employee
router.post("/employees", async (req, res) => {
    if(!req.body){
        return res.status(404).send({message: "Mssing contents of request body"})
    }

    const { first_name, last_name, email, 
        position, salary, date_of_joining, 
        department, userId } = req.body

    try{
        const employee = new EmpModel({
            first_name: first_name, 
            last_name: last_name, 
            email: email, 
            position: position, 
            salary: salary, 
            date_of_joining: date_of_joining, 
            department: department, 
            user: userId, 
            created_at: Date.now(), 
            updated_at: Date.now()
        })
        
        const savedUser = await employee.save()

        return res.status(201).json(savedUser)
    
    } catch(err){
        return res.status(500).send({message: err.message || "An error occurred in the server"})
    }
})

// GET an employee with id
router.get("/employees/:eid", async (req, res) => {
    if (!req.params.eid){
        return res.status(404).json({
            error: "Missing path parameter (employee id)"
        })
    }

    let query = {_id: new ObjectId(req.params.eid)}

    try{
        let emp = await EmpModel.findOne(query)
        return res.status(200).json(emp)

    } catch(err){
        return res.status(500).send({message: err.message || "An error occurred in the server"})
    }
})

// PUT update an employee with id
router.put("/employees/:eid", async (req, res) => {
    if (!req.params.eid){
        return res.status(404).json({
            error: "Missing path parameter or body"
        })
    }

    const { first_name, last_name, email, 
        position, salary, date_of_joining, 
        department, userId } = req.body

    try{
        const employee = {
            first_name: first_name, 
            last_name: last_name, 
            email: email, 
            position: position, 
            salary: salary, 
            date_of_joining: date_of_joining, 
            department: department, 
            user: userId,
            updated_at: Date.now()
        }
        
        let emp = await EmpModel.findByIdAndUpdate(req.params.eid, employee, { new: true })

        return res.status(200).json(emp)

    } catch(err){
        return res.status(500).send({message: err.message || "An error occurred in the server"})
    }
})


// GET delete an employee with id
router.delete("/employees", async (req, res) => {
    if(!req.query.eid){
        return res.status(404).json({ error: "Missing query parameter"})
    }

    try{
        await EmpModel.findByIdAndDelete(req.query.eid)
        res.sendStatus(204)

    } catch(err){
        return res.status(500).send({message: err.message || "An error occurred in the server"})
    }
})

module.exports = router