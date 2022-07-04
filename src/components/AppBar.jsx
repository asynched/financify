import React from 'react'
import { Link } from 'react-router-dom'

import {
  HomeIcon,
  UserCircleIcon,
  ChartBarIcon,
} from '@heroicons/react/outline'

import {
  HomeIcon as HomeIconSolid,
  UserCircleIcon as UserCircleIconSolid,
  ChartBarIcon as ChartBarIconSolid,
} from '@heroicons/react/solid'

/**
 *
 * @param { { active: 'home' | 'stats' | 'profile' } } props
 * @returns
 */
export default function AppBar({ active }) {
  return (
    <div className="py-4 fixed w-full bottom-0 flex gap-2 items-center justify-around bg-white border-t text-gray-600">
      <Link to="/home" aria-label="Home" className="flex flex-col items-center">
        {active === 'home' ? (
          <HomeIconSolid className="w-6 h-6" />
        ) : (
          <HomeIcon className="w-6 h-6" />
        )}
      </Link>
      <Link
        to="/statistics"
        aria-label="Stats"
        className="flex flex-col items-center"
      >
        {active === 'stats' ? (
          <ChartBarIconSolid className="w-6 h-6" />
        ) : (
          <ChartBarIcon className="w-6 h-6" />
        )}
      </Link>
      <Link
        to="/profile"
        aria-label="Profile"
        className="flex flex-col items-center"
      >
        {active === 'profile' ? (
          <UserCircleIconSolid className="w-6 h-6" />
        ) : (
          <UserCircleIcon className="w-6 h-6" />
        )}
      </Link>
    </div>
  )
}
