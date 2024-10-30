import React from 'react'
import completedIcon from "../assets/tick-icon.svg";
import pendingIcon from "../assets/circle-icon.svg";
import crossIcon from "../assets/cross-icon.svg";

const TaskListing = () => {
  return (
    <section className='max-h-[60%] overflow-scroll'>
        {/* <TaskZeroState /> */}
        <Task status="completed" description={"Brush teeth"} />
        <Task status="completed" description={"Buy grocery"} />
        <Task status="pending" description={"Pay rent"} />
        <Task status="pending" description={"Clean room"} />
        <Task status="pending" description={"Do homework"} />

        <Task status="pending" description={"Pay rent"} />
        <Task status="pending" description={"Clean room"} />
        <Task status="pending" description={"Do homework"} />
        <Task status="pending" description={"Pay rent"} />
        <Task status="pending" description={"Clean room"} />
        <Task status="pending" description={"Do homework"} />
    </section>
  )
}

 const Task = ({status, description}) => {
    return (
        <div className={`rounded-2xl flex items-center border-[1.5px] my-3 min-h-12 px-4 py-2 w-[100%] ${status === "completed" ? "bg-[#ddf0d29c] border-[#8ed3a7]" : ""}`}>
          <img src={status === 'completed' ? completedIcon : pendingIcon} alt='task completion status' className='basis-[3%] h-[25px] mr-2  cursor-pointer' />
          <div className='basis-[94%] '>{description}</div>
          <img src={crossIcon} alt='delete task icon' className='basis-[3%] h-[25px] relative right-0 cursor-pointer' />
        </div>
    )
}

const TaskZeroState = ({}) => {
    return (
        <div className={`text-center flex justify-center items-center border-0 my-3 px-4 py-10 w-[100%]`}>
            Welcome! Start by adding your first task!
        </div>
    )
}

export default TaskListing