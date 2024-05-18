import React from 'react'

function Comment({name,time,comment}) {
  return (
    <div className="mt-8 w-full md:w-2/3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="ms-3 flex-1">
            <a
              href="#"
              className="text-lg font-semibold hover:text-indigo-600 duration-500"
            >
             {name}
            </a>
            <p className="text-sm text-slate-400">{time}</p>
          </div>
        </div>
      </div>
      <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-md shadow dark:shadow-gray-800 mt-6">
        <p className="text-slate-400 italic">
          {comment}
        </p>
      </div>
    </div>
  );
}

export default Comment