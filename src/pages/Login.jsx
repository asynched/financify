import React from 'react'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

import { auth } from '@/firebase'
import { useNavigate } from 'react-router-dom'

const googleProvider = new GoogleAuthProvider()

export default function Login() {
  const navigate = useNavigate()

  const handleSignIn = () => {
    signInWithPopup(auth, googleProvider).then(() => {
      navigate('/home')
    })
  }

  return (
    <div>
      <h1>Login</h1>
      <button
        className="bg-red-600 py-1 px-2 text-white"
        onClick={handleSignIn}
      >
        Google
      </button>
    </div>
  )
}
