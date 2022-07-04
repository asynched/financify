import React from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

import { auth } from '@/firebase'

const googleProvider = new GoogleAuthProvider()

export default function Login() {
  const navigate = useNavigate()

  const handleSignIn = () => {
    signInWithPopup(auth, googleProvider).then(() => {
      navigate('/home')
    })
  }

  return (
    <div className="h-screen bg-gray-100 grid place-items-center">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold tracking-tighter">
          Login - Financify
        </h1>
        <div className="mt-4 flex flex-col gap-2 w-[90%] max-w-[512px]">
          <button
            className="bg-red-600 py-2 text-white rounded-lg"
            onClick={handleSignIn}
          >
            Google
          </button>
          <button className="bg-gray-900 text-white py-2 rounded-lg">
            GitHub
          </button>
        </div>
      </div>
    </div>
  )
}
