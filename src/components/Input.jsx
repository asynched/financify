import React from 'react'

export default function Input({
  name,
  text,
  type = 'text',
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name}>{text}</label>
      <input
        placeholder={placeholder}
        className="border border-gray-300 transition ease-in-out focus:ring-purple-600 focus:ring-2 focus:border-transparent"
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
