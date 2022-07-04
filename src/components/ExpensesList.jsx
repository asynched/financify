import React from 'react'

import { formatDate } from '@/utils/date'
import { formatCurrency } from '@/utils/currency'

export default function ExpensesList({ expensesSnapshot, onEditClick }) {
  return (
    <ul className="flex flex-col gap-4">
      {expensesSnapshot.map((expense) => (
        <li
          className="bg-white rounded-lg py-2 px-4 flex items-center gap-2"
          key={expense.id}
          onClick={() => onEditClick(expense)}
        >
          <div
            className={`grid place-items-center w-10 h-10 rounded-full text-white font-bold bg-gradient-to-br ${
              expense.amount > 0
                ? 'from-green-500 to-blue-600'
                : 'from-pink-500 to-red-600'
            }`}
          >
            $
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p>{expense.title}</p>
              <p className="font-semibold text-gray-900">
                {formatCurrency(+expense.amount)}
              </p>
            </div>
            <p className="text-sm">
              Created: {formatDate(expense.createdAt?.toDate())}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}
