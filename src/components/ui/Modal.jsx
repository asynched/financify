import React from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function Modal({ show, toggle, title, description, children }) {
  return (
    <Transition
      show={show}
      enter="transition duration-200 ease-out"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition duration-200 ease-out"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Dialog
        className="bg-black bg-opacity-50 fixed top-0 left-0 h-screen w-full grid place-items-center backdrop-blur-sm"
        onClose={toggle}
      >
        <Dialog.Panel className="text-gray-600 bg-white p-8 w-[90%] max-w-[512px] rounded-lg shadow-lg">
          <Dialog.Title className="text-gray-900 text-2xl font-bold tracking-tighter">
            {title}
          </Dialog.Title>
          <Dialog.Description>{description}</Dialog.Description>
          {children}
        </Dialog.Panel>
      </Dialog>
    </Transition>
  )
}
