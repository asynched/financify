import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import useAuth from '@/hooks/firebase/useAuth'
import Loading from '@/components/ui/Loading'

import Login from '@/pages/Login'
const Home = React.lazy(() => import('@/pages/Home'))
const Profile = React.lazy(() => import('@/pages/Profile'))
const Statistics = React.lazy(() => import('@/pages/Statistics'))

const privateRoutes = [/^\/home$/, /^\/profile$/, /^\/statistics$/]

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
    <React.Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </React.Suspense>
  )
}
