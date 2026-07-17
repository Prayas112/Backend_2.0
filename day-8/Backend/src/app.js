const express = require("express")
const notemodel = require("./models/notes.model")

const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())

app.post("/api/notes",async(req,res)=>{
    const{title, description} = req.body
  const note =await notemodel.create({
        title, description
    })
    res.status(201).json({
        message:"created",note
    })
})

app.get("/api/notes",async(req, res)=>{
 const notes =await notemodel.find()
 res.status(200).json({
    message:"fetched",notes
 })
})

app.delete("/api/notes/:id",async(req, res)=>{
        const id =  req.params.id
        await notemodel.findByIdAndDelete(id)
        res.status(201).json({
            message:"deleted"
        })
})
app.patch("/api/notes/:id",async(req,res)=>{
    const id = req.params.id
    const {description} = req.body
   await notemodel.findByIdAndUpdate(id,{description})
   res.status(200).json({
    message:"updated"
   })
})

module.exports = app