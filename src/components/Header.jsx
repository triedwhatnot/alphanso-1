import React from 'react'
import MagnifyingGlass from "../assets/magnifying-glass.svg"

const Header = () => {
  return (
    <header className='flex flex-col md:flex-row min-h-[17%] md:h-[15%] justify-between items-start md:items-center py-0 md:py-1'>
        <div className='basis-[10%] md:ml-5 text-3xl font-bold mb-2 md:mb-0'>Today</div>
        <div className='relative flex items-center basis-[80%] w-[100%] mb-2 md:mb-0'>
            <img src={MagnifyingGlass} alt='magnifying glass icon' className='h-[25px] absolute md:relative left-4 md:left-10' />
            <input type='text' placeholder='Search' className='outline-none border-gray-300 rounded-3xl w-[100%] md:w-[90%] border-2 h-10 px-12 py-2' />
        </div>
        <select className='basis-[10%] border-gray-300 border-2 h-10 rounded-3xl p-2 mr-5 outline-none'>
          <option>All</option>
          <option>Completed</option>
          <option>Pending</option>
        </select>
    </header>
  )
}

export default Header