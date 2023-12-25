const express = require("express");
const { NoteModel } = require("../models/note.model");
const {auth}=require("../middlewares/auth.middleware")

const noteRouter = express.Router();

noteRouter.post("/create",auth, async (req, res) => {
    try {
        const note = new NoteModel(req.body)
        await note.save();
        res.status(200).send({ "msg": "new note added" })
    } catch (error) {
        res.status(400).send({ "error": error })
    }
})

noteRouter.get("/",auth, async (req, res) => {
    try {
        const notes = await NoteModel.find({userID:req.body.userID})
        res.status(200).send(notes)
    } catch (error) {
        res.status(400).send({ "error": error })
    }
})

noteRouter.patch("/update/:noteID",auth, async (req, res) => {
    const {noteID}=req.params
    try {
        const note=await NoteModel.findOne({_id:noteID})
        if(req.body.userID===note.userID){
            await NoteModel.findByIdAndUpdate({_id:noteID},req.body)
            res.status(200).send({"msg":`Note with id:${noteID} has been updated`})
        }else{
            res.status(400).send({ "msg": "You are not authorized to update this document" })
        }
    } catch (error) {
        res.status(400).send({ "error": error })
    }
})

noteRouter.delete("/delete/:noteID",auth, async (req, res) => {
    const {noteID}=req.params
    try {
        const note=await NoteModel.findOne({_id:noteID})
        if(req.body.userID===note.userID){
            await NoteModel.findByIdAndDelete({_id:noteID})
            res.status(200).send({"msg":`Note with id:${noteID} has been deleted`})
        }else{
            res.status(400).send({ "msg": "You are not authorized to delete this document" })
        }
    } catch (error) {
        res.status(400).send({ "error": error })
    }
})

module.exports = {
    noteRouter
}
