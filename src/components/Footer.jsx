import React, { useContext, useEffect, useState } from 'react'
import { TASK_STATUS } from '../constants';
import { SetTaskListContext } from '../context';

const Footer = () => {
  const [taskDescInput, setTaskDescInput] = useState("");
  const [inputErrorState, setInputErrorState] = useState(false);
  const setTasksList =  useContext(SetTaskListContext);

  const addTaskHandler = () => {
    if(taskDescInput){
        setTasksList((taskList) => {
            let newTaskId = taskList.length ? taskList[0].taskId + 1 : 1;
            // adding new task at the beginning of the list, so that it appears at the top
            return [
                {
                    taskId: newTaskId,
                    description: taskDescInput,
                    status: TASK_STATUS.PENDING.id,
                },
                ...taskList,
            ]
        });
        setTaskDescInput("");
    }
    else{
        setInputErrorState(true);
    }
  }

  const handleEnterPress = (e) => {
    if(e.key === "Enter"){
        addTaskHandler();
    }
  }

  useEffect(() => {
    // highlight empty description error for 2 secs
    let timerId = null;
    if(inputErrorState){
        timerId = setTimeout(() => {
            setInputErrorState(false);
        }, 2000);
    }

    return () => {
        clearTimeout(timerId);
    }
  }, [inputErrorState]);

  return (
    <footer className='flex flex-col md:h-[20%]'>
        <input data-testid="task-desc-input" minLength={1} maxLength={70} placeholder='Type something' type='text' onKeyDown={handleEnterPress} className={`mb-3 border-2 my-3 h-12 px-4 py-2 rounded-2xl outline-none ${inputErrorState ? "border-red-400 animate-pulse" : ""}`} value={taskDescInput} onChange={(e) => {setTaskDescInput(e.target.value)}} />
        <button data-testid="add-task-cta" className='bg-slate-800 text-gray-200 h-10 rounded-xl' onClick={addTaskHandler}>Add Task</button>
    </footer>
  )
}

export default Footer