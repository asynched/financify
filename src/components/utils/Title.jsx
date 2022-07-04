import { useEffect } from 'react'

export default function Title({ children }) {
  if (typeof children !== 'string') {
    throw new Error(
      'Title must be a string value, received: ' + typeof children
    )
  }

  useEffect(() => {
    document.title = children
  }, [children])

  return null
}
