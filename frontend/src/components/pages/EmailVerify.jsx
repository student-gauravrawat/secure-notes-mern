import React, { useState } from "react";
import {emailVerify, resendOTP} from "../../services/auth.service"
import { Link, useLocation, useNavigate } from "react-router-dom";


function EmailVerify() {

     const [otp, setOtp] = useState("");
     const [loading, setLoading] = useState(false)
     
     const location = useLocation()
     const registerEmail = location.state?.email || ""
     const [email, setEmail] = useState(registerEmail)
     const navigate = useNavigate()

     const handleOtpChange = (e) => {
        // e.preventDefault()
       let value = e.target.value;
   
       value = value.replace(/\D/g, "");
   
       if (value.length <= 6) {
         setOtp(value);
        //  console.log(otp)
        }
     };
     
     const handleEmailVerify = async(e)=>{
        e.preventDefault()

        try {
            await emailVerify({email, otp})
            navigate("/login")

        } catch (error) {
           console.log("error", error)
        }
     }

     const handleReSendOTP = async(e)=>{
       e.preventDefault()

       try {
         await resendOTP(email)

       } catch (error) {
         console.log("error", error)
         
       }
     }
     
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-indigo-200 via-purple-200 to-pink-200 relative overflow-hidden">
      {/* Attractive Background Elements (Floating Notes) */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-white/30 rounded-lg rotate-12 animate-pulse" />
      <div
        className="absolute bottom-20 right-10 w-32 h-32 bg-white/20 rounded-xl -rotate-12 animate-bounce"
        style={{ animationDuration: "4s" }}
      />
      <div className="absolute top-1/2 -left-12 w-40 h-40 bg-cyan-200/40 rounded-full blur-3xl" />

      {/* Main Login Card */}
      <div className="relative z-10 w-full max-w-md p-8 mx-4 mb-18 sm:mb-0 bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl">
        {/* Logo/Icon Area */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-white/40 p-4 rounded-2xl mb-4 shadow-inner">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">
            Secure Notes
          </h2>
          <p className="text-gray-600 font-medium">Protect your account with email verification.</p>
        </div>

        <form onSubmit={handleEmailVerify} 
            className="space-y-6">

          {/* Username Field */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Email
            </label>
            <input
              type="text"
              disabled
              value={email}
              className="w-full px-5 py-3 bg-white/50 border border-white/50 rounded-2xl focus:ring-4 focus:ring-indigo-300 focus:bg-white outline-none transition-all duration-300 placeholder-gray-400"
              placeholder="Enter your email"
            />
          </div>

          {/* OTP Field - Placed below Username */}
          <div className="space-y-1">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-semibold text-gray-700">
                OTP Code
              </label>
              <button
                type="button"
                onClick={handleReSendOTP}
                className="text-xs text-indigo-600 font-bold hover:underline"
              >
                Resend OTP
              </button>
            </div>
            <input
              type="text"
              inputMode="numeric"
              value={otp}
              onChange={handleOtpChange}
              maxLength="6"
              className="w-full px-5 py-3 bg-white/50 border border-white/50 rounded-2xl focus:ring-4 focus:ring-indigo-300 focus:bg-white outline-none transition-all duration-300 placeholder-gray-400 text-center tracking-[1em] font-mono"
              placeholder="000000"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 hover:shadow-indigo-400 hover:-translate-y-1 active:scale-95 transition-all duration-200"
          >
             {loading ? "Email Verifying" : "Verify Email"}
          </button>
        </form>

        {/* Links */}
        <div className="mt-8 flex justify-between items-center text-md">
          <button className="text-gray-600 hover:text-indigo-700 transition-colors">
            <Link to="/register"> Create Account Again</Link>
          </button>
          <button className="font-bold text-indigo-700 hover:underline">
             <Link to="/login">Login</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmailVerify;
