import React, { useEffect, useState } from 'react'
import MagnifyingGlass from "../assets/magnifying-glass.svg"
import { FILTER_OPTIONS } from '../constants'

const Header = ({ filter, setFilter, setSearchQuery }) => {
    const [searchVal, setSearchVal] = useState("");

    useEffect(() => {
        // debouncing logic : filter only after 1 sec has passed since last user input
        let timerId = setTimeout(() => {
            setSearchQuery(searchVal);
        }, 1000);

        return () => {
            clearTimeout(timerId);
        }
    }, [searchVal]);


  return (
    <header className='flex flex-col md:flex-row min-h-[17%] md:h-[15%] justify-between items-start md:items-center py-0 md:py-1'>
        <div className='basis-[10%] md:ml-5 text-3xl font-bold mb-2 md:mb-0'>Today</div>
        <div className='relative flex items-center basis-[80%] w-[100%] mb-2 md:mb-0'>
            <img src={MagnifyingGlass} alt='magnifying glass icon' className='h-[25px] absolute md:relative left-4 md:left-10' />
            <input data-testid="search-query-input" type='text' placeholder='Search' className='outline-none border-gray-300 rounded-3xl w-[100%] md:w-[90%] border-2 h-10 px-12 py-2' value={searchVal} onChange={(e) => {setSearchVal(e.target.value)}} />
        </div>
        <select data-testid="status-dropdown" className='basis-[10%] border-gray-300 border-2 h-10 rounded-3xl p-2 mr-5 outline-none' value={filter} onChange={(e) => {setFilter(+e.target.value)}}>
          <option value={FILTER_OPTIONS.ALL.id}>All</option>
          <option value={FILTER_OPTIONS.COMPLETED.id}>Completed</option>
          <option value={FILTER_OPTIONS.PENDING.id}>Pending</option>
        </select>
    </header>
  )
}

export default Header