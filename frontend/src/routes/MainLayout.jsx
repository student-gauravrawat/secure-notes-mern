import React from 'react'
import {Navbar, Footer, ScrollToTop} from "../components/index"
import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
     <div className="min-h-screen w-full flex flex-col bg-linear-to-br from-indigo-200 via-purple-200 to-pink-200 relative overflow-x-hidden">

          {/* Background Elements */}
           <div className="absolute top-10 left-10 w-24 h-24 bg-white/30 rounded-lg rotate-12 animate-pulse" />
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/20 rounded-xl -rotate-12 animate-bounce" style={{ animationDuration: '4s' }} />
          <div className="absolute top-1/2 -left-12 w-40 h-40 bg-cyan-200/40 rounded-full blur-3xl" />
           <ScrollToTop/>
           <Navbar/>
           <main className='w-full flex-1 sm:pt-29 pt-25 pb-10'>
              <Outlet/>
           </main>
    </div>
  )
}

export default MainLayout
