import sgMail from "@sendgrid/mail"
import { ApiError } from "./ApiError.js"

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
console.log("API KEY:", process.env.SENDGRID_API_KEY ? "Loaded" : "Missing")

export const sendEmail = async(to, otp)=>{
  try {
      await sgMail.send({
      from:  process.env.EMAIL, 
      to: to,                       
      subject: "Email Verification OTP",
      html: `
        <h2>Email Verification OTP</h2>
        <p>Your OTP is: <strong>${otp}</strong></p>
        <p>Valid for 10 minutes</p>
      `
    })
  } catch (error) {
    console.error("Email send error:", error)
    throw new ApiError(500, "Failed to send OTP on your email")
  }

}