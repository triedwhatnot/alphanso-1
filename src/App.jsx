import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import TaskListing from './components/TaskListing'
import Footer from './components/Footer'

function App() {

  return (
    <div className='h-screen w-screen flex justify-center items-center bg-[#83bb65]'>
      <div className='w-[90vw] md:w-[80vw] h-[90vh] md:h-[80vh] m-auto bg-gray-100 rounded-2xl px-5 md:px-10 py-2 md:py-0'>
        <Header />
        <TaskListing />
        <Footer />
      </div>
    </div>
    
  )
}

export default App

/*

  1. tasks - add, delete, status, 
    1.1 filter, search
    1.2 form validation - empty task - border red and use in-built prompts
    1.3 can add animation while removing / adding task
    1.4 push completed task at the bottom of the list
  2. undo - deleted task can be retrived for first 5 secs
  3. use local Storage to persist data
  4. dark / light mode

*/
