import useAuth from '@/hooks/firebase/useAuth'
import DefaultLayout from '@/layouts/DefaultLayout'
import { formatDate } from '@/utils/date'
import React from 'react'

export default function Profile() {
  const auth = useAuth()

  return (
    <DefaultLayout>
      <div className="text-gray-600 h-screen flex flex-col items-center justify-center">
        <img
          src={auth?.photoURL}
          alt={auth?.displayName}
          referrerPolicy="no-referrer"
          className="rounded-full mb-4 h-32 w-32"
        />
        <h1 className="text-4xl text-gray-900 font-bold tracking-tighter">
          {auth?.displayName}
        </h1>
        <p>{auth?.email}</p>
        <p>Joined in {formatDate(new Date(auth?.metadata.creationTime))}.</p>
      </div>
    </DefaultLayout>
  )
}
