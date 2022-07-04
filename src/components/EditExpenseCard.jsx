import React, { useEffect } from 'react'
import createBox, { useBoxForm } from 'blackbox.js'

import { preventDefault } from '@/utils/ui'
import { noop } from '@/utils/functional'
import { deleteExpense, updateExpense } from '@/firebase/impl/expenses'

import Modal from '@/components/ui/Modal'
import Input from '@/components/Input'
import useAuth from '@/hooks/firebase/useAuth'

const editExpenseBox = createBox({
  title: '',
  description: '',
  amount: '',
  recurring: false,
  day: '',
})

export default function EditExpenseCard({ show, toggle, expense }) {
  const user = useAuth()
  const [expenseForm, register] = useBoxForm(editExpenseBox)

  const toggleRecurring = () => {
    editExpenseBox.set((s) => ({
      ...s,
      recurring: !s.recurring,
    }))
  }

  const handleDelete = async () => {
    await deleteExpense(expense.id, user.uid)
    toggle()
  }

  const handleUpdate = async () => {
    await updateExpense(expense.id, user.uid, {
      ...expenseForm,
      amount: +expenseForm.amount,
    })
    toggle()
  }

  useEffect(() => {
    if (expense) {
      editExpenseBox.set(() => {
        return { ...expense }
      })
    }
  }, [expense])

  return (
    <Modal
      show={show}
      toggle={toggle}
      title="Edit expense"
      description="Fill in with the info you want to edit."
    >
      <form
        onSubmit={preventDefault(noop)}
        className="mt-4 flex flex-col gap-2"
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
        <button
          onClick={handleDelete}
          className="mt-2 py-2 border font-bold tracking-tighter text-purple-500 border-purple-500 rounded-lg transition ease-in-out hover:bg-purple-500 hover:text-white"
        >
          Delete
        </button>
        <button
          onClick={handleUpdate}
          className="rounded-lg mt-1 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-600 py-2 text-white font-bold tracking-tighter transition ease-in-out hover:brightness-110"
        >
          Save
        </button>
      </form>
    </Modal>
  )
}
