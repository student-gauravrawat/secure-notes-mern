import mongoose, {Schema} from "mongoose";

const todoSchema = new Schema({
   content: {
      type: String,
      required: true,
      trim: true
   },
   complete: {
      type: Boolean,
      default: false
   },
   owner: {
     type: Schema.Types.ObjectId,
     ref: "User"
   }

}, {timestamps: true})

export const Todo = mongoose.model("Todo", todoSchema)
