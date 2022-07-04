import React from 'react'

export default function Loading() {
  return (
    <div className="fixed z-50 top-0 left-0 h-screen w-full bg-black bg-opacity-50 grid place-items-center backdrop-blur-sm">
      <div className="bg-white p-4 h-[10rem] w-[10rem] flex items-center justify-center rounded-xl shadow-xl">
        <div className="loader">Loading...</div>
      </div>
    </div>
  )
}
