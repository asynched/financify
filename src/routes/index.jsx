import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import useAuth from '@/hooks/firebase/useAuth'

import Login from '@/pages/Login'
import Home from '@/pages/Home'
import Profile from '@/pages/Profile'

const privateRoutes = [/^\/home$/, /^\/profile$/]

export default function Router() {
  const auth = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!auth) {
      return navigate('/')
    }

    if (privateRoutes.some((item) => item.test(window.location.pathname))) {
      return
    }

    navigate('/home')
  }, [auth, navigate])

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  )
}
