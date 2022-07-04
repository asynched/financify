import React from 'react'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import { auth } from '@/firebase'
import { formatDate } from '@/utils/date'

import useAuth from '@/hooks/firebase/useAuth'

import { LogoutIcon } from '@heroicons/react/outline'
import DefaultLayout from '@/layouts/DefaultLayout'
import Title from '@/components/utils/Title'

export default function Profile() {
  const user = useAuth()
  const navigate = useNavigate()

  const signOutUser = () => {
    signOut(auth).then(() => navigate('/'))
  }

  return (
    <DefaultLayout appBarActive="profile">
      <Title>Financify | Profile</Title>
      <div className="text-gray-600 h-screen flex flex-col items-center justify-center">
        <img
          src={user?.photoURL}
          alt={user?.displayName}
          referrerPolicy="no-referrer"
          className="rounded-full mb-4 h-32 w-32"
        />
        <h1 className="mb-4 text-4xl text-gray-900 font-bold tracking-tighter">
          {user?.displayName}
        </h1>
        <p>{user?.email}</p>
        <p>Joined in {formatDate(new Date(user?.metadata.creationTime))}.</p>
        <button
          onClick={signOutUser}
          className="mt-8 bg-red-600 text-white py-2 px-4 rounded-lg flex items-center gap-2"
        >
          Log off
          <LogoutIcon className="w-4 h-4" />
        </button>
      </div>
    </DefaultLayout>
  )
}
