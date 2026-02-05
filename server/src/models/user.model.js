import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    todos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Todo"
        }
    ],
    emailVerified: {
        type: Boolean,
        default: false
    },
    emailOtp: {
        type: String
    },
    emailOtpExpiry: {
        type: Date
    },
    refreshToken: {
        type: String
    }

}, {timestamps: true})

//* password bcrypt
userSchema.pre("save", async function(){
    if(!this.isModified("password")) return;
    try {
        this.password = await bcrypt.hash(this.password, 15)
    } catch (error) {
         throw error
    }
})


//* bcrypt password check function
userSchema.methods.isPasswordCorrect = async function(password){
      return await bcrypt.compare(password, this.password)
}

//* Generate Access Token
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            user: this.username,
            fullName: this.fullName
        },
            process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

//* Generate Refresh Token
userSchema.methods.generateRefreshToken = async function(){
   return jwt.sign(
        {
            _id: this._id
        },
            process.env.REFRESH_TOKEN_SECRET,
         {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
         }
    )
}

export const User = mongoose.model("User", userSchema)
