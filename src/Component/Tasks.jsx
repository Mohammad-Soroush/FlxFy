import React from 'react'

function Tasks({task}) {
  return (
    <>
      <div className='bg-white shadow transition hover:shadow-2xl py-10 px-6 sm:px-10 md:px-20 rounded-2xl mt-3'>
        {/* Header */}
        <div className="upcomingtask flex gap-3 items-center mb-2">
          <img className="w-5 h-6" src='src/assets/ClipboardText.png' />
          <h2 className='text-blue-600 text-lg sm:text-xl md:text-2xl'>{task[0].kinds}</h2>
        </div>

        {/* Task Name */}
        <div className="mounting">
          <p className='text-lg sm:text-xl md:text-2xl font-semibold'>{task[0].mount}</p>

          {/* Date + Time Row */}
          <div className="Dateandtimes flex justify-between items-center mt-3 pb-3">

            {/* Date + Time container */}
            <div className="flex gap-5 items-center">
              {/* Date */}
              <div className="dates flex gap-1 items-center">
                <img className='w-5' src='src/assets/CalendarDots.png' />
                <p className='text-sm sm:text-base md:text-lg'>{task[0].day} {task[0].month} {task[0].dayN}, {task[0].year}</p>
              </div>

              {/* Time */}
              <div className="time flex gap-1 items-center">
                <img className="w-5" src="src/assets/Vector.png" alt="" />
                <p className='text-sm sm:text-base md:text-lg'>11:30 AM</p>
              </div>
            </div>

            {/* Arrow stays at the far right */}
            <img className='w-4 sm:w-5' src='src/assets/arrow.png' />
          </div>
        </div>
      </div>

    </>
  )
}

export default Tasks