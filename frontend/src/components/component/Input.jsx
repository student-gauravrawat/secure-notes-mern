import React from 'react'

function Input({ value="", onChange, onSubmit, isEditing }) {
  return (
    <section className='mt-0'>
           <form onSubmit={onSubmit}>
             <div  className='flex justify-center items-center gap-4'>
                 <input type="text" 
                        value={value}
                        onChange={(e)=> onChange(e.target.value)}
                        placeholder='Write you notes here...'
                        className='bg-white focus:outline-none  p-2.5 md:w-90 w-61 lg:w-98 sm:w-70 border border-white/50 rounded-2xl focus:ring-3 focus:ring-indigo-300 focus:bg-white outline-none transition-all duration-300 placeholder-gray-500 md:placeholder-gray-400'
                 />
                 <button type='submit' 
                         className='bg-blue-600 text-white px-6 h-12 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-md shrink-0'>
                         {isEditing ? "Update" : "Add"}
                </button>
             </div>
           </form>
    </section>
  )
}

export default Input
