import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {User} from "../models/user.model.js"
import {Todo} from "../models/todo.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { isValidObjectId } from "mongoose";

const addTodo = asyncHandler( async(req, res)=>{
   const {content} = req.body

   if(!content){
     throw new ApiError(400, "Content field is required")
   }
 
   const user = await User.findById(req.user?._id)  
 
    if(!user){
       throw new ApiError(401, "User not found")
    }

    const todoAdd = await Todo.create({
        content,
        owner: user._id
    })

    if(!todoAdd){
       throw new ApiError(500, "Failed to create note.")
    }

   await User.findByIdAndUpdate(
        req.user?._id,
        {
            $push: {todos: todoAdd._id}
        },
        {new: true}
    )
    res.status(200)
       .json(new ApiResponse(200, todoAdd, "Note created sucessfully"))

})

const deleteTodo = asyncHandler( async(req, res)=>{
     const {notesId} = req.params

     if(!isValidObjectId(notesId)){
        throw new ApiError(400, "Invalid Note ID")
     }

     const note = await Todo.findById(notesId)

     if(!note){
        throw new ApiError(400, "Note is not found")
     }

    if(note.owner._id.toString() !== req.user._id.toString()){
          throw new ApiError(400, "You can not delete this note")
    }


     const deleteNotes = await Todo.findByIdAndDelete(notesId)

     if(!deleteNotes){
        throw new ApiError(500, "Note deletation failed")
     }

     const updateUser = await User.findOneAndUpdate(
        req.user?._id,
        {
            $pull: {
                todos: notesId
            }
        }
     )
     
     if(!updateUser){
         throw new ApiError(500, "Note could not be remove from user collection")
     }

     return res.status(200)
               .json(new ApiResponse(200, {}, "Note delete sucessfully"))

})

const updateTodo = asyncHandler( async(req, res)=>{
    const {content, complete} = req.body
    const {notesId} = req.params
    const updateFields = {}

    if(!isValidObjectId(notesId)){
       throw new ApiError(400, "Invalid comment ID")
    }
    
    const todo =  await Todo.findById(notesId)
 
    if(!todo){
        throw new ApiError(400, "Note is not found")
    }
    
    if(content !== undefined){
        if(content.trim() === ""){
           throw new ApiError(400, "Content can not be empty")
        }
        updateFields.content = content
    }

    if(complete !== undefined){
       updateFields.complete = complete
    }

    if(Object.keys(updateFields).length === 0){
         throw new ApiError(400, "field is empty to update")
    }


    if(req.user?._id.toString() !== todo.owner?._id.toString()){
        throw new ApiError(400, "You can edit this message")
    }

    const updateNote = await Todo.findByIdAndUpdate(
        notesId,
        {
            $set: updateFields
        },
        { new: true }
    )

    if(!updateNote){
        throw new ApiError(500, "Update failed")
    }

    return res.status(200)
              .json(new ApiResponse(200, updateNote, "Note is updated sucessfully"))
})


export {
    addTodo,
    deleteTodo,
    updateTodo
}