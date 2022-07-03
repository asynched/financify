import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'

import { auth } from '@/firebase'

/**
 * # useAuth
 *
 * Helper hook to listen for auth state changes.
 *
 * @returns { import('firebase/auth').User? } The authenticated user.
 */
export default function useAuth() {
  const [authState, setAuthState] = useState(auth.currentUser)

  useEffect(() => {
    return onAuthStateChanged(auth, setAuthState)
  }, [])

  return authState
}
