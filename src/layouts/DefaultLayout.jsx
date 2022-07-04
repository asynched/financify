import React from 'react'

import AppBar from '@/components/AppBar'

/**
 *
 * @param { { appBarActive: 'home' | 'profile' | 'stats', children: React.ReactNode }} props
 * @returns
 */
export default function DefaultLayout({ appBarActive, children }) {
  return (
    <div className="relative min-h-screen bg-gray-100">
      {children}
      <AppBar active={appBarActive} />
    </div>
  )
}
