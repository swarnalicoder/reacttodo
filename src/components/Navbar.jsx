import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex justify-between text-white bg-violet-600 py-2">
    <div className="logo">
      <span className='font-bold text-xl mx-9 '>iTask</span>
    </div>
    <ul className="flex gap-8 ">
      <li class='cursor-pointer hover:font-bold transition-all'>Home</li>
      <li class='cursor-pointer hover:font-bold transition-all'>Your Task</li>
    </ul>


  </nav>
  )
}

export default Navbar
