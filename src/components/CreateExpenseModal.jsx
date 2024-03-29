import React from 'react'
import createBox, { useBoxForm } from 'blackbox.js'

import { preventDefault } from '@/utils/ui'
import { createExpense } from '@/firebase/impl/expenses'

import useAuth from '@/hooks/firebase/useAuth'

import Input from '@/components/Input'
import Modal from '@/components/ui/Modal'

const expenseBox = createBox({
  title: '',
  amount: '',
  description: '',
  recurring: false,
  day: '',
})

export default function CreateExpenseModal({ show, toggle }) {
  const user = useAuth()
  const [expenseForm, register] = useBoxForm(expenseBox)

  const toggleRecurring = () => {
    expenseBox.set((s) => ({
      ...s,
      recurring: !s.recurring,
    }))
  }

  const handleSubmit = async () => {
    await createExpense(expenseForm, user.uid)
    toggle()
  }

  return (
    <Modal
      title="Create new expense"
      description="Fill in the form with your expense information"
      show={show}
      toggle={toggle}
    >
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
            checked={expenseForm.recurring}
            onChange={toggleRecurring}
            type="checkbox"
            id="recurring"
            name="recurring"
            className="rounded text-purple-600 transition ease-in-out focus:ring-purple-600"
          />
          <label htmlFor="recurring">Recurring</label>
        </div>
        {expenseForm.recurring && (
          <Input
            name="day"
            text="Payment date (of every month)"
            type="number"
            placeholder="15 (for the 15th of every month)"
            {...register('day')}
          />
        )}
        <button className="rounded-lg mt-2 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-600 py-2 text-white font-bold tracking-tight transition ease-in-out hover:brightness-110">
          Create
        </button>
      </form>
    </Modal>
  )
}
