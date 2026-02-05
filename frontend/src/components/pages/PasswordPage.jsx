import React, { useState } from "react";
import { changePassword } from "../../services/auth.service";

function PasswordPage() {

  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handlePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await changePassword(password);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setPassword({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <div className="relative z-10 w-full max-w-md p-8 mx-auto mb-10 mt-10 sm:mt-10 sm:mb-0 bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl">
      {/* Logo/Icon Area */}
      <div className="flex flex-col items-center mb-5">
        <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">
          Reset Your Password
        </h2>
        <p className="text-gray-600 font-medium">Keep your secrets locked.</p>
      </div>

      <form onSubmit={handlePassword} className="space-y-6 sm:space-y-5">
        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-700 ml-1">
            Old Password
          </label>
          <input
            type="password"
            value={password.oldPassword}
            required
            onChange={(e) =>
              setPassword({ ...password, oldPassword: e.target.value })
            }
            className="w-full px-5 py-3 bg-white/50 border border-white/50 rounded-2xl focus:ring-4 focus:ring-indigo-300 focus:bg-white outline-none transition-all duration-300 placeholder-gray-400"
            placeholder="Enter your username"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-700 ml-1">
            New Password
          </label>
          <input
            type="password"
            required
            value={password.newPassword}
            onChange={(e) =>
              setPassword({ ...password, newPassword: e.target.value })
            }
            className="w-full px-5 py-3 bg-white/50 border border-white/50 rounded-2xl focus:ring-4 focus:ring-indigo-300 focus:bg-white outline-none transition-all duration-300 placeholder-gray-400"
            placeholder="Enter your full name"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-700 ml-1">
            Confirm password
          </label>
          <input
            type="password"
            required
            value={password.confirmPassword}
            onChange={(e) =>
              setPassword({ ...password, confirmPassword: e.target.value })
            }
            className="w-full px-5 py-3 bg-white/50 border border-white/50 rounded-2xl focus:ring-4 focus:ring-indigo-300 focus:bg-white outline-none transition-all duration-300 placeholder-gray-400"
            placeholder="Enter your email"
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full py-3.5 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 hover:shadow-indigo-400 hover:-translate-y-1 active:scale-95 transition-all duration-200"
        >
          {loading ? "Password Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
}

export default PasswordPage;
