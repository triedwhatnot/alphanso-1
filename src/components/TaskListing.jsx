import React, { useContext, useEffect, useState } from 'react'
import completedIcon from "../assets/tick-icon.svg";
import pendingIcon from "../assets/circle-icon.svg";
import crossIcon from "../assets/cross-icon.svg";
import { FILTER_OPTIONS, TASK_STATUS } from '../constants';
import { SetTaskListContext } from '../context';
import { capitalizeFirstLetter } from '../utility';

// method to filter and sort tasks
function getTaskListing(tasksList, searchQuery, filter){
    let taskListCopy = JSON.parse(JSON.stringify(tasksList));

    // filter using search query
    if(searchQuery){
        let searchQueryLc = searchQuery.toLowerCase();
        taskListCopy = taskListCopy.filter(task => {
            return task.description.toLowerCase().includes(searchQueryLc);
        });
    }

    // filter using status selected
    if(filter !== FILTER_OPTIONS.ALL.id){
        taskListCopy = taskListCopy.filter(task => {
            return task.status === (FILTER_OPTIONS.COMPLETED.id === filter ? TASK_STATUS.COMPLETED.id : TASK_STATUS.PENDING.id);
        });

        // sort to keep the new tasks above old tasks
        taskListCopy.sort((taskA, taskB) => {
            return taskB.taskId - taskA.taskId;
        });
    }
    else{
        taskListCopy.sort((taskA, taskB) => {
            return taskB.taskId - taskA.taskId;
        });
        let completedTasks = taskListCopy.filter(task => {
            return task.status === TASK_STATUS.COMPLETED.id;
        });
        let pendingTasks = taskListCopy.filter(task => {
            return task.status === TASK_STATUS.PENDING.id;
        });
        
        // display pending tasks above completed tasks
        taskListCopy = [...pendingTasks, ...completedTasks];
    }
    return taskListCopy;
}

const TaskListing = ({tasksList, searchQuery, filter}) => {

    let filteredTaskList = getTaskListing(tasksList, searchQuery, filter);

  return (
    <section className='max-h-[60%] overflow-scroll'>
        {
            filteredTaskList?.length 
            ?
            filteredTaskList.map( task => {
                return (
                    <Task key={task.taskId} taskId={task.taskId} status={task.status} description={task.description} />
                )
            })
            :
            <TaskZeroState />
        }
        
    </section>
  )
}

 const Task = ({status, description, taskId}) => {
    const [showUndoUI, setShowUndoUI] = useState(false);
    const [timerId, setTimerId] = useState(null);
    const setTasksList =  useContext(SetTaskListContext);

    // logic to update task completion status
    const handleStatusToggle = () => {
        setTasksList(taskList => {
            let updatedTaskList = JSON.parse(JSON.stringify(taskList));
            for(let task of updatedTaskList){
                if(task.taskId === taskId){
                    task.status = (task.status === TASK_STATUS.COMPLETED.id ? TASK_STATUS.PENDING.id : TASK_STATUS.COMPLETED.id);
                }
            }
            return updatedTaskList;
        });
    }

    const handleDelete = () => {
        setShowUndoUI(true);
    }

    const handleUndoDeletion = () => {
        clearTimeout(timerId);
        setShowUndoUI(false);
    }

    // delete task only after 3 secs has passed and user cannot "undo" this operation anymore
    useEffect(() => {
        const timerId = null;
        if(showUndoUI){
            setTimerId(setTimeout(() => {
                setTasksList(taskList => {
                    let updatedTaskList = JSON.parse(JSON.stringify(taskList));
                    
                    return updatedTaskList.filter(task => task.taskId !== taskId);
                });
            }, 3000))
        }

        return () => {
            clearTimeout(timerId);
        }
    }, [showUndoUI]);

    return (
        <div data-testid="task-el-parent" className={`rounded-2xl flex items-center border-[1.5px] my-3 min-h-12 px-4 py-2 w-[100%] ${status === TASK_STATUS.COMPLETED.id && !showUndoUI ? "bg-[#ddf0d29c] border-[#8ed3a7]" : ""}`}>
            {
                showUndoUI 
                ? 
                <div className='cursor-pointer text-red-400' onClick={handleUndoDeletion}>Undo</div>
                :
                <>
                    <img data-testid="task-el-status" data-status={status} src={status === TASK_STATUS.COMPLETED.id ? completedIcon : pendingIcon} alt='task completion status' className='basis-[3%] h-[25px] mr-2  cursor-pointer' onClick={handleStatusToggle} />
                    <div data-testid="task-el-desc" className='basis-[94%] '>{capitalizeFirstLetter(description)}</div>
                    <img data-testid="task-el-delete" src={crossIcon} alt='delete task icon' className='basis-[3%] h-[25px] relative right-0 cursor-pointer' onClick={handleDelete} />
                </>
            }
        </div>
    )
}

const TaskZeroState = ({}) => {
    return (
        <div data-testid="task-zero-state" className={`text-center flex justify-center items-center border-0 my-3 px-4 py-10 w-[100%]`}>
            Welcome! Start by adding your first task!
        </div>
    )
}

export default TaskListing