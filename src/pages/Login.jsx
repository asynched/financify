import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from 'firebase/auth'

import { auth } from '@/firebase'

import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'

const googleProvider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()

export default function Login() {
  const navigate = useNavigate()

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider).then(() => {
      navigate('/home')
    })
  }

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider).then(() => {
      navigate('/home')
    })
  }

  return (
    <div className="h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 grid place-items-center">
      <div className="px-8 py-16 w-[90%] max-w-[32rem] flex flex-col items-center rounded-lg bg-white">
        <h1 className="mb-2 text-5xl font-bold tracking-tighter text-clip bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Financify
        </h1>
        <p className="mb-4 text-gray-600 text-center">
          Hello! What&apos;s up? You can login with one of your social medias
          here
        </p>
        <div className="mt-4 flex flex-col gap-2 w-full">
          <button
            className="py-2 border flex items-center justify-center gap-2 rounded-lg text-gray-900"
            onClick={handleGoogleSignIn}
          >
            <FcGoogle />
            Google
          </button>
          <button
            onClick={handleGithubSignIn}
            className="py-2 border flex items-center justify-center gap-2 rounded-lg bg-gray-900 text-white"
          >
            <FaGithub />
            GitHub
          </button>
        </div>
      </div>
    </div>
  )
}
