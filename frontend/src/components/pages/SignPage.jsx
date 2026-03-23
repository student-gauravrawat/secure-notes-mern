import React, { useState } from "react";
import { register } from "../../services/auth.service";
import { Link, useNavigate } from "react-router-dom";

function SignPage() {

  const [user, setUser] = useState({
    username: "",
    email: "",
    fullName: "",
    password: ""
  })
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault();
    // console.log(user)
    setLoading(true)

    try {
      const res = await register(user)
      navigate("/email-verify",{
        state: {email: user.email}
      })

    } catch (error) {
       console.log("error", error)

    }finally{
      setLoading(false)
    }
  };

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
      <div className="relative z-10 w-full max-w-md p-8 mx-4 mb-10 mt-5 sm:mt-2.5 sm:mb-0 bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl">
        {/* Logo/Icon Area */}
        <div className="flex flex-col items-center mb-5">
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
          <p className="text-gray-600 font-medium">Join and keep your notes private.</p>
        </div>

        <form onSubmit={handleRegister} 
              className="space-y-6 sm:space-y-5"
         >

          {/* Username Field */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Username
            </label>
            <input
              type="text"
              value={user.username}
              required
              onChange={(e)=> setUser({...user, username: e.target.value})}
              className="w-full px-5 py-3 bg-white/50 border border-white/50 rounded-2xl focus:ring-4 focus:ring-indigo-300 focus:bg-white outline-none transition-all duration-300 placeholder-gray-400"
              placeholder="Enter your username"
            />
          </div>

          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={user.fullName}
              onChange={(e)=> setUser({...user, fullName: e.target.value})}
              className="w-full px-5 py-3 bg-white/50 border border-white/50 rounded-2xl focus:ring-4 focus:ring-indigo-300 focus:bg-white outline-none transition-all duration-300 placeholder-gray-400"
              placeholder="Enter your full name"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Email
            </label>
            <input
              type="email"
              required
              value={user.email}
              onChange={(e)=> setUser({...user, email: e.target.value})}
              className="w-full px-5 py-3 bg-white/50 border border-white/50 rounded-2xl focus:ring-4 focus:ring-indigo-300 focus:bg-white outline-none transition-all duration-300 placeholder-gray-400"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Password
            </label>
            <input
              type="password"
              required
              value={user.password}
              onChange={(e)=> setUser({...user, password: e.target.value})}
              className="w-full px-5 py-3 bg-white/50 border border-white/50 rounded-2xl focus:ring-4 focus:ring-indigo-300 focus:bg-white outline-none transition-all duration-300 placeholder-gray-400"
              placeholder="••••••••"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3.5 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 hover:shadow-indigo-400 hover:-translate-y-1 active:scale-95 transition-all duration-200"
          >
           {loading? (
                        <span className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Registering...
                        </span>
                     ) : "Register"}
          </button>
        </form>

        {/* Links */}
        <div className="mt-8 sm:mt-5 flex gap-1.5 items-center text-sm">
          <p className="text-gray-600 hover:text-indigo-700 transition-colors">
            Already Account?
          </p>
          <button className="font-bold text-lg text-indigo-700 hover:underline">
             <Link to="/login">Login</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignPage;
