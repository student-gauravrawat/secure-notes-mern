import  {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {User} from "../models/user.model.js"
import {generateOtp} from "../utils/generateOtp.js"
import {sendEmail} from "../utils/sendEmail.js"
import { isValidObjectId } from "mongoose"
import {Todo} from "../models/todo.model.js"
import jwt from "jsonwebtoken"

const generateAccessAndRefreshToken = async (userId)=>{
   try {
      const user = await User.findById(userId)
      const accessToken = await user.generateAccessToken()
      const refreshToken = await user.generateRefreshToken()

      user.refreshToken = refreshToken;

      await user.save({validateBeforeSave: false});
      return {accessToken, refreshToken}

   } catch (error) {
      throw new ApiError(500, "Something went wrong while generating refresh and access token")
   }
}

const register = asyncHandler( async(req, res)=>{
   const {username, fullName, email, password} = req.body

   if([username, fullName, email, password].some((field)=> !field || field.trim() === "")){
     throw new ApiError(400, "All fields are required")
   }
 
   if(!email.endsWith("@gmail.com")){
      throw new ApiError(400, "Without @gmail.com email is not acceptable")
   }

 const existedUser = await User.findOne({
        $or: [
            {username},
            {email}
        ]
    })

 if(existedUser){
     throw new ApiError(409, "User with email or username is already exists")
 }

const otp = generateOtp()

const user = await User.create({
    username: username.toLowerCase(),
    email,
    fullName,
    password,
    emailOtp: otp,
    emailOtpExpiry: Date.now() + 10 * 60 *1000
 })

 
 const createdUser = await User.findById(user._id).select(" -password -refreshToken ")

 
 if(!createdUser){
     throw new ApiError(500, "Something ent wrong while registering the user")
 }

 await sendEmail(email, otp)
    
 return res.status(200)
           .json(new ApiResponse(200, createdUser, "Registration Sucessfully. OTP has been sent to your email."))

}) 

const verifyEmailOtp = asyncHandler( async(req, res)=>{
   const {email, otp} = req.body

   const user = await User.findOne({email})

   if(!user){
      throw new ApiError(404, "User not found")
   }

   if(user.emailVerified){
       throw new ApiError(400, "Email already verified")
    }

   if(user.emailOtp !== otp){
       throw new ApiError(400, "Invalid OTP")
   }

   if(user.emailOtpExpiry < Date.now()){
      throw new ApiError(400, "OTP expired")
   }

   user.emailVerified = true
   user.emailOtp = undefined
   user.emailOtpExpiry = undefined

   await user.save()

   return res.status(200)
             .json(new ApiResponse(200, {}, "Email verified sucessfully"))

})

const resendEmailOtp = asyncHandler( async(req, res)=>{
   const {email} = req.body

   if(!email){
      throw new ApiError(400, "Email is required")
   }
   
    const user = await User.findOne({email})
   
    if(!user){
      throw new ApiError(404, "User is not found")   
    }
   
    if(user.emailVerified){
       throw new ApiError(400, "Email already verified")
    }
   
    const newOtp = generateOtp()
   
    user.emailOtp = newOtp
    user.emailOtpExpiry = Date.now() + 10 * 60 * 1000
   
    await user.save()
    await sendEmail(email, newOtp)
   
    return res.status(200)
           .json(new ApiResponse(200, {}, "New OTP has been sent to your email"))
})

const login = asyncHandler( async(req, res)=>{
    const {email, username, password} = req.body

    if(!(email || username)){
       throw new ApiError(400, "username or email is required")
    }

    if(!password){
       throw new ApiError(400, "Password is required")
    }

    const user = await User.findOne({
        $or: [
              {username},
              {email}
          ]
     });

 if(!user){
    throw new ApiError(404, "User does not exists")
 }

 if(!user.emailVerified){
    throw new ApiError(403, "Please verify your email first")
 }

 const isPasswordCorrect = await user.isPasswordCorrect(password)

 if(!isPasswordCorrect){
     throw new ApiError(401, "password is incorrect")
 }

const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

const loggedUser = await User.findById(user._id).select("-password -refreshToken").populate("todos")

const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
};

return res.status(200)
          .cookie("accessToken", accessToken, options)
          .cookie("refreshToken", refreshToken, options)
          .json(new ApiResponse(200, {
            user: loggedUser,
            // accessToken,
            // refreshToken
          }, "User logged in Sucessfully"))

}) 

const logout = asyncHandler( async(req, res)=>{
  await User.findByIdAndUpdate(
      req.user?._id,
      {
         $unset: {
            refreshToken: 1,
         }
      },
      {
         new: true
      }
   );
   const options = {
      httpOnly: true,
      secure: true
   }

   return res.status(200)
             .clearCookie("accessToken", options)
             .clearCookie("refreshToken", options)
             .json(new ApiResponse(200, {}, "User logged Out"))

}) 

const getFreshUser = asyncHandler( async(req, res)=>{
      const user = await User.findById(req.user?._id).select("-password -refreshToken").populate("todos")

      if(!user){
         throw new ApiError(400, "User not found")
      }

      return res.status(200)
                .json(new ApiResponse(200, user , "User get sucessfully"))
}) 

const changePassword = asyncHandler( async(req, res)=>{
  const { oldPassword, newPassword, confirmPassword} = req.body

  if([oldPassword, newPassword, confirmPassword].some((field)=> !field || field.trim()=== "")){
     throw new ApiError(400, "All fields are required")
  }

  if(!newPassword === confirmPassword){
   throw new ApiError(401, "New passwold and confirm password are not mathing")
  }

  const user = await User.findById(req.user._id)
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

  if(!isPasswordCorrect){
     throw new ApiError(400, "Old password is incorrect")
  }
 
  user.password = newPassword
  await user.save({validateBeforeSave: false})

  return res.status(200)
            .json(new ApiResponse(200, {}, "Password changed sucessfully"))
}) 

const deleteAccount = asyncHandler( async(req, res)=>{
    const userId = req.user._id

    if(!isValidObjectId(userId)){
       throw new ApiError(400, "Invalid user ID")
    }

    const user = await User.findById(userId)

    if(!user){
      throw new ApiError(400, "Use not found")
    }

    const deleteUser = await User.findByIdAndDelete(userId)

    if(!deleteUser){
        throw new ApiError(500, "User deletation failed")
    }

   await Todo.deleteMany({owner: userId})

   return res.status(200)
             .json(new ApiResponse(200, {}, "User deleted sucessfully"))
}) 

const refreshAccessToken = asyncHandler( async(req, res)=>{
   const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

   if(!incomingRefreshToken){
      throw new ApiError(401, "Unauthorized request");
   }

   const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
   )

   const user = await User.findById(decodedToken?._id)

   if(!user){
      throw new ApiError(401, "Invalid refresh token")
   }

   if(incomingRefreshToken !== user?.refreshToken){
      throw new ApiError(401, "Refresh token is expired or used")
   }

   const {accessToken, newRefreshToken} = await generateAccessAndRefreshToken(user._id)

   const options = {
      httpOnly: true,
      secure: true,
      sameSite: "strict"
   }

   return res.status(200)
             .json(new ApiResponse(200, {accessToken, refreshToken: newRefreshToken}, "Access token refreshed"))
 })

export {
    register,
    verifyEmailOtp,
    resendEmailOtp,
    login,
    logout,
    changePassword,
    getFreshUser, 
    deleteAccount,
    refreshAccessToken
}