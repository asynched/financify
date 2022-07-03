import { useState } from 'react'

/**
 * # useToggle
 *
 * Helper hook for toggling a boolean value.
 *
 * @param { boolean } initialState Initial toggle state
 * @returns { [boolean, () => void, React.Dispatch<React.SetStateAction<boolean>>] }
 * A tuple containing the boolean value, the toggle function and a setter for the toggle state
 */
export default function useToggle(initialState = false) {
  const [toggle, setToggle] = useState(initialState)

  const toggleState = () => {
    setToggle((p) => !p)
  }

  return [toggle, toggleState, setToggle]
}
