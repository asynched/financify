import React, { useMemo } from 'react'

import { formatCurrency } from '@/utils/currency'
import { partition, sum } from '@/utils/functional'

export default function ExpenseBalance({ expensesSnapshot }) {
  const [incomes, expenses] = useMemo(
    () => partition(expensesSnapshot, (e) => e.amount > 0),
    [expensesSnapshot]
  )

  const incomesTotal = sum(incomes, (e) => e.amount)
  const expensesTotal = sum(expenses, (e) => e.amount)
  const balance = incomesTotal - expensesTotal
  return (
    <div className="mb-8 grid grid-cols-3 px-4 -mt-8 pb-2 gap-2">
      <div className="p-4 bg-white shadow-lg rounded-lg">
        <p className="text-green-600">Income</p>
        <h2 className="text-lg font-bold tracking-tighter text-gray-900">
          {formatCurrency(incomesTotal)}
        </h2>
      </div>
      <div className="p-4 bg-white shadow-lg rounded-lg">
        <p className="text-red-600">Expenses</p>
        <h2 className="text-lg font-bold tracking-tighter text-gray-900">
          {formatCurrency(expensesTotal * -1)}
        </h2>
      </div>
      <div className="p-4 bg-white shadow-lg rounded-lg">
        <p className="text-gray-600">Balance</p>
        <h2 className="text-lg font-bold tracking-tighter text-gray-900">
          {formatCurrency(balance)}
        </h2>
      </div>
    </div>
  )
}
