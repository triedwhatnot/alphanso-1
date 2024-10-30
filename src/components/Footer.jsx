import React from 'react'

const Footer = () => {
  return (
    <footer className='flex flex-col md:h-[20%]'>
        <input placeholder='Type something' type='text' className='mb-3 border-2 my-3 h-12 px-4 py-2 rounded-2xl outline-none' />
        <button className='bg-slate-800 text-gray-200 h-10 rounded-xl'>Add Task</button>
    </footer>
  )
}

export default Footer