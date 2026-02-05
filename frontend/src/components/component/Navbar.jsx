import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { useNavigate, Navigate, NavLink } from "react-router-dom";
import { clearAuthUser } from "../../redux/userSlice";
import { logOut } from "../../services/auth.service";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleLogOut = async()=>{
    
     try {
        await logOut()
        dispatch(clearAuthUser(null))
        navigate("/login")
     } catch (error) {
       console.log(error)
     }
  }

  return (
    <nav
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-6xl 
                    bg-white/10 backdrop-blur-xl border border-white/20 
                    rounded-3xl shadow-2xl transition-all duration-300"
    >
      <div className="flex items-center justify-between p-4 md:px-8">
        {/* Brand/Logo */}
        <div className="flex items-center gap-1 font-bold text-xl tracking-tight">
          <span className="text-blue-700">Secure</span>
          <span className="text-blue-400/80">Notes</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <ul className="flex items-center gap-10 text-black/80 font-medium">
            <li className=" cursor-pointer transition-colors hover:text-gray-600 ">
              <NavLink to="/"
                      className={({isActive})=>`${isActive? "font-bold text-blue-600 text-lg" : ""}`}
               >
                  All Notes
              </NavLink>
            </li>
            <li className=" cursor-pointer transition-colors hover:text-gray-600 ">
               <NavLink to="/completednotes"
                      className={({isActive})=>`${isActive? "font-bold text-blue-600 text-lg" : ""}`}
               >
                   Completed Notes
              </NavLink>
            </li>
            <li className=" cursor-pointer transition-colors hover:text-gray-600">
            
               <NavLink to="/uncompletednotes"
                      className={({isActive})=>`${isActive? "font-bold text-blue-600 text-lg" : ""}`}
               >
                     Pending Notes
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Right Side: Logout & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button className="hidden sm:block px-5 py-2 bg-white text-gray-900 rounded-full text-sm font-semibold hover:bg-blue-500 hover:text-white transition-all cursor-pointer">
             <NavLink to="/changepassword">
                 change Password
             </NavLink>
          </button>

          <button onClick={handleLogOut} 
                 className="hidden sm:block px-5 py-2 bg-white text-gray-900 rounded-full text-sm font-semibold hover:bg-blue-500 hover:text-white transition-all cursor-pointer">
            Logout
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-800 text-3xl focus:outline-none"
          >
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`${isOpen ? "max-h-85 opacity-100" : "max-h-0 opacity-0"} 
                        md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white/5 rounded-b-3xl`}
      >
        <ul className="flex flex-col items-center gap-4 py-5 text-black font-medium">
          <li
            className=" cursor-pointer w-full text-center py-2 hover:text-gray-600"
            onClick={() => setIsOpen(false)}
          >
           <NavLink to="/"
                    className={({isActive})=>`${isActive? "font-bold text-blue-600 text-lg" : ""}`}
            >
              All Notes
           </NavLink>
          </li>
          <li
            className=" cursor-pointer w-full text-center py-2 hover:text-gray-600"
            onClick={() => setIsOpen(false)}
          >
            <NavLink to="/completednotes"
                    className={({isActive})=>`${isActive? "font-bold text-blue-600 text-lg" : ""}`}
            >
              Completed Notes
           </NavLink>
          </li>
          <li
            className=" cursor-pointer w-full text-center py-2 hover:text-gray-600"
            onClick={() => setIsOpen(false)}
          >
             <NavLink to="/uncompletednotes"
                    className={({isActive})=>`${isActive? "font-bold text-blue-600 text-lg" : ""}`}
            >
               Pending Notes
           </NavLink>
          </li>
          <li className="sm:hidden">
            <button className="mt-2 px-8 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded-full">
              <NavLink to="/changepassword">
                Change Password
              </NavLink>
            </button>
          </li>
          <li className="sm:hidden">
            <button onClick={handleLogOut} 
                    className="mt-2 px-8 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded-full">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
