import React from 'react'
import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'

import { auth } from '@/firebase'

import { HomeIcon, UserCircleIcon, LogoutIcon } from '@heroicons/react/outline'

export default function AppBar() {
  const signOutUser = () => {
    signOut(auth)
  }

  return (
    <div className="pt-2 fixed w-full bottom-0 flex gap-2 justify-around bg-white border-t text-gray-600">
      <Link to="/home" className="flex flex-col items-center">
        <HomeIcon className="w-6 h-6" />
        <p>Home</p>
      </Link>
      <Link to="/profile" className="flex flex-col items-center">
        <UserCircleIcon className="w-6 h-6" />
        <p>Profile</p>
      </Link>
      <button onClick={signOutUser} className="flex flex-col items-center">
        <LogoutIcon className="w-6 h-6" />
        <p>Exit</p>
      </button>
    </div>
  )
}
