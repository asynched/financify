import React, { useMemo } from 'react'
import { collection, limit, query, where } from 'firebase/firestore'

import { firestore } from '@/firebase'
import { formatDate } from '@/utils/date'
import { formatCurrency } from '@/utils/currency'
import { partition, sum } from '@/utils/functional'

import useToggle from '@/hooks/useToggle'
import useSnapshot from '@/hooks/firebase/useSnapshot'
import useAuth from '@/hooks/firebase/useAuth'

import DefaultLayout from '@/layouts/DefaultLayout'

import CreateExpenseModal from '@/components/CreateExpenseModal'

export default function Dashboard() {
  const user = useAuth()
  const expensesQuery = useMemo(
    () =>
      query(
        collection(firestore, 'expenses'),
        where('ownerId', '==', user?.uid || null),
        limit(5)
      ),
    [user]
  )

  const expensesSnapshot = useSnapshot(expensesQuery)
  const [incomes, expenses] = useMemo(
    () => partition(expensesSnapshot, ({ amount }) => amount > 0),
    [expensesSnapshot]
  )
  const incomesTotal = sum(incomes, ({ amount }) => amount)
  const expensesTotal = sum(expenses, ({ amount }) => amount)

  const [modal, toggleModal] = useToggle(false)

  return (
    <DefaultLayout>
      <CreateExpenseModal show={modal} toggle={toggleModal} />
      <div className="py-16 px-8 text-white bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500">
        <h1 className="text-4xl font-bold tracking-tighter">
          Hello, {user?.displayName}!
        </h1>
        <p>What&apos;s up for today?</p>
      </div>
      <div className="mb-8 grid grid-cols-2 px-4 -mt-8 pb-2 gap-4">
        <div className="p-4 bg-white shadow-lg rounded-lg">
          <p className="text-green-600">Income</p>
          <h2 className="text-2xl font-bold tracking-tighter text-gray-900">
            {formatCurrency(incomesTotal)}
          </h2>
        </div>
        <div className="p-4 bg-white shadow-lg rounded-lg">
          <p className="text-red-600">Expenses</p>
          <h2 className="text-2xl font-bold tracking-tighter text-gray-900">
            {formatCurrency(expensesTotal * -1)}
          </h2>
        </div>
      </div>
      {/* <div className="-mt-8 pb-2 mb-8 overflow-x-auto">
        <div className="px-4 flex gap-2 min-w-max">
          <button
            onClick={toggleModal}
            className="px-6 py-4 bg-white text-gray-900 shadow-lg rounded"
          >
            Register a new card
          </button>
          <button className="px-6 py-4 bg-white text-gray-900 shadow-lg rounded">
            Statistics
          </button>
        </div>
      </div> */}

      <div className="px-4 text-gray-600">
        <h2 className="mb-4 text-gray-900 text-2xl font-bold tracking-tighter">
          Activity
        </h2>
        <ul className="flex flex-col gap-4">
          {expensesSnapshot.map((expense) => (
            <li className="flex items-center gap-2" key={expense.id}>
              <div
                className={`grid place-items-center w-10 h-10 rounded-full text-white font-bold bg-gradient-to-br ${
                  expense.amount > 0
                    ? 'from-green-500 to-green-600'
                    : 'from-red-500 to-red-600'
                }`}
              >
                $
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p>{expense.title}</p>
                  <p className="font-semibold text-gray-900">
                    {formatCurrency(+expense.amount)} USD
                  </p>
                </div>
                <p className="text-sm">
                  {formatDate(expense.createdAt?.toDate())}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </DefaultLayout>
  )
}
