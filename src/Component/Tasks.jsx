import React from 'react'
import { ClipboardText, CalendarDots, Arrow } from '../assetsJS'
import { Clock, ChevronRight } from "lucide-react";
function Tasks({ task }) {
  return (
    <>
      <div className='bg-white shadow transition hover:shadow-2xl py-10 px-6 sm:px-10 md:px-20 rounded-2xl mt-3'>
        {/* Header */}
        <div className="upcomingtask flex gap-3 items-center mb-2">
          <img className="w-5 h-6" src={ClipboardText} />
          <h2 className='text-blue-600 text-lg sm:text-xl md:text-2xl'>{task[0].kinds}</h2>
        </div>

        {/* Task Name */}
        <div className="mounting">
          <p className="text-lg sm:text-xl md:text-2xl font-semibold">{task[0].mount}</p>

          {/* Date + Time Row */}
          <div className="Dateandtimes flex justify-between items-center mt-3 pb-3">

            {/* Date + Time container */}
            <div className="flex gap-5 items-center">
              {/* Date */}
              <div className="dates flex gap-1 items-center">
                <img className="w-5" src={CalendarDots} />
                <p className="text-xs sm:text-sm md:text-lg">{task[0].day} {task[0].month} {task[0].dayN}, {task[0].year}</p>
              </div>

              {/* Time */}
              <div className="time flex items-center gap-2 sm:gap-2">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-400" />
                <p className="text-xs sm:text-sm md:text-lg text-black font-medium">
                  11:30 AM
                </p>
              </div>
            </div>

            {/* Arrow stays at the far right with extra gap on mobile */}
            <div className="ml-2 sm:ml-0">
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10 text-blue-400 flex-shrink-0" />
            </div>
          </div>
        </div>


      </div>

    </>
  )
}

export default Tasks