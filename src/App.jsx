import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import TaskListing from './components/TaskListing'
import Footer from './components/Footer'
import { FILTER_OPTIONS } from './constants'
import { SetTaskListContext } from './context'

function getInitialTasks(){
  const tasksList = localStorage.getItem("tasksList");
  return tasksList ? JSON.parse(tasksList) : [];
}

function App() {
  const [tasksList, setTasksList] = useState(getInitialTasks);  
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState(FILTER_OPTIONS.ALL.id);  

  useEffect(() => {
    if(tasksList){
      // to store tasks list in localStorage on change
      localStorage.setItem("tasksList", JSON.stringify(tasksList));
    }
  }, [tasksList]);

  return (
    <SetTaskListContext.Provider value={setTasksList}>
      <div className='h-screen w-screen flex justify-center items-center bg-[#83bb65]'>
        <div className='w-[90vw] md:w-[80vw] h-[90vh] md:h-[80vh] m-auto bg-gray-100 rounded-2xl px-5 md:px-10 py-2 md:py-0'>
          <Header
            filter={filter}
            setFilter={setFilter}
            setSearchQuery={setSearchQuery}
          />
          <TaskListing
            tasksList={tasksList}
            searchQuery={searchQuery}
            filter={filter}
          />
          <Footer />
        </div>
      </div>
    </SetTaskListContext.Provider>
  )
}

export default App

/*
  WORKFLOW:

  1. tasks - add, delete, status update,  ( DONE )
    1.1 filter, search  ( DONE )
    1.2 form validation - empty task - border red ( DONE )
    1.3 push completed task at the bottom of the list  ( DONE )
  2. undo - deleted task can be retrived for first 5 secs  ( DONE )
  3. use local Storage to persist data  ( DONE )
  4. test cases

  tasks structure
    taskId
    status
    description

  1. initially fetch from localstorage and start, else zeroth state appears  ( DONE )
    - UI to present pending task first and then, completed ones
    - both lists to have tasks sorted internally on taksids too (decreasing - latest at top)

  2. add / delete / update
    - add : ( DONE )
      - new taskId : highest id + 1, initially sort task on basis of IDs
      - delete fields
      - form Validation to prevent empty additions. red border for 2 secs
      - enter press key handling

    - delete :  ( DONE )
      - search and delete using taskId
      - delete task only after 3 secs, till then show undo UI

    - update status ( DONE )
      - use taskId and update status

    - filter ( DONE )
      - just update using status

    - search ( DONE )
      - to implement debouncing on keystrokes

  3. update localstorage on taskList update ( DONE )
  
*/
