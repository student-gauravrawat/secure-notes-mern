import nodemailer from "nodemailer"
import { ApiError } from "./ApiError.js"

export const sendEmail = async(to, otp)=>{
  try {
     const transporter = nodemailer.createTransport({
     service: "gmail",
     auth: {
         user: process.env.EMAIL_USER,
         pass: process.env.EMAIL_PASS
       }
    })

    await transporter.sendMail({
     from : `"Secret Goals" <${process.env.EMAIL_USER}>`,
     to,
     subject: "Email Verification OTP",
     html: `
       <h2>Email Verification</h2>
       <p>Your OTP is:</p>
       <h1>${otp}</h1>
       <p>Valid for 10 minutes</p>
      `
    })
  } catch (error) {
    console.error("Email send error:", error)
    throw new ApiError(500, "Failed to send OTP on your email")
  }

}