import { useEffect, useState } from 'react'
import { onSnapshot } from 'firebase/firestore'

export default function useSnapshot(snapshot) {
  const [snapshotState, setSnapshotState] = useState([])

  useEffect(() => {
    return onSnapshot(snapshot, (snapshot) => {
      setSnapshotState(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      )
    })
  }, [snapshot, setSnapshotState])

  return snapshotState
}
