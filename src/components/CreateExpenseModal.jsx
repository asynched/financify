import React from 'react'
import createBox, { useBoxForm } from 'blackbox.js'

import { preventDefault } from '@/utils/ui'
import { createExpense } from '@/firebase/impl/expenses'

import useAuth from '@/hooks/firebase/useAuth'

import Input from '@/components/Input'
import { Dialog, Transition } from '@headlessui/react'

const expenseBox = createBox({
  title: '',
  amount: '',
  description: '',
  recurring: false,
  day: '',
})

export default function CreateExpenseModal({ show, toggle }) {
  const user = useAuth()
  const [expense, register] = useBoxForm(expenseBox)

  const toggleRecurring = () => {
    expenseBox.set((s) => ({
      ...s,
      recurring: !s.recurring,
    }))
  }

  const handleSubmit = async () => {
    console.log(expense)
    const doc = await createExpense(expense, user.uid)
    console.log(doc)
  }

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
        className="bg-black bg-opacity-50 fixed top-0 left-0 h-screen w-full grid place-items-center "
        onClose={toggle}
      >
        <Dialog.Panel className="text-gray-600 bg-white p-8 w-[90%] max-w-[512px] rounded-lg shadow-lg">
          <Dialog.Title className="text-gray-900 text-2xl font-bold tracking-tighter">
            Create new card
          </Dialog.Title>
          <Dialog.Description>
            Fill in the form with your expense information
          </Dialog.Description>
          <form
            onSubmit={preventDefault(handleSubmit)}
            className="mt-4 flex flex-col gap-4"
          >
            <Input
              name="title"
              text="Title"
              placeholder="Title for the card"
              {...register('title')}
            />
            <Input
              name="amount"
              text="Amount"
              type="number"
              placeholder="Amount (positive for income, negative for expense)"
              {...register('amount')}
            />
            <Input
              name="description"
              text="Description"
              placeholder="A description for the card"
              {...register('description')}
            />
            <div className="flex gap-2 items-center">
              <input
                checked={expense.recurring}
                onChange={toggleRecurring}
                type="checkbox"
                id="recurring"
                name="recurring"
                className="text-purple-600 transition ease-in-out focus:ring-purple-600"
              />
              <label htmlFor="recurring">Recurring</label>
            </div>
            {expense.recurring && (
              <Input
                name="day"
                text="Payment date (of every month)"
                type="number"
                placeholder="15 (for the 15th of every month)"
                {...register('day')}
              />
            )}
            <button className="mt-2 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-600 py-2 text-white font-bold tracking-tight transition ease-in-out hover:brightness-110">
              Create
            </button>
          </form>
        </Dialog.Panel>
      </Dialog>
    </Transition>
  )
}
