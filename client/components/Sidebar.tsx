"use client"
import { Menu } from 'lucide-react'
import React from 'react'

const Sidebar = () => {
  return (
    <div>
        {/* top */}
        <div className='flex gap-3 justify-between md:justify-normal items-center pt-8'>
            <div>logo</div>
            <h1 className='font-semibold'>Stock</h1>
            <button className='md:hidden px-3 py-3 hover:bg-white/5 transition rounded-full' onClick={()=>{}}><Menu className='h-4 w-4' />
            </button>
        </div>
        {/* links */}

        <div className='grow mt-8'>
       
        </div>

        {/* footer  */}
        <div className='text-center text-xs'>
      &copy; {new Date().getFullYear()} Stock. All rights reserved.
        </div>

    </div>
  )
}

export default Sidebar