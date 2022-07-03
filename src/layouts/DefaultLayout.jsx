import React from 'react'

import AppBar from '@/components/AppBar'

export default function DefaultLayout({ children }) {
  return (
    <div className="relative">
      {children}
      <AppBar />
    </div>
  )
}
