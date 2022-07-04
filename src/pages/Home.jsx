import React, { useMemo, useState } from 'react'
import { collection, query, where } from 'firebase/firestore'

import { firestore } from '@/firebase'
import { getDateRange } from '@/utils/date'
import useSnapshot from '@/hooks/firebase/useSnapshot'
import useAuth from '@/hooks/firebase/useAuth'
import useToggle from '@/hooks/useToggle'

import DefaultLayout from '@/layouts/DefaultLayout'
import CreateExpenseModal from '@/components/CreateExpenseModal'
import ExpensesList from '@/components/ExpensesList'
import ExpenseBalance from '@/components/ExpenseBalance'
import WaitForProperty from '@/components/utils/WaitForProperty'
import EditExpenseCard from '@/components/EditExpenseCard'
import Loading from '@/components/ui/Loading'
import Title from '@/components/utils/Title'

export default function Dashboard() {
  const user = useAuth()

  return (
    <WaitForProperty
      property={user}
      beforeDefined={<Loading />}
      afterDefined={<DashboardPage />}
    />
  )
}

const DashboardPage = () => {
  const user = useAuth()

  const expensesQuery = useMemo(() => {
    const { current, previous } = getDateRange()
    return query(
      collection(firestore, 'expenses', user.uid, 'items'),
      where('createdAt', '>=', previous),
      where('createdAt', '<=', current),
      where('recurring', '==', false)
    )
  }, [user])

  const recurringExpensesQuery = useMemo(
    () =>
      query(
        collection(firestore, 'expenses', user.uid, 'items'),
        where('recurring', '==', true)
      ),
    [user]
  )

  const recurringExpensesSnapshot = useSnapshot(recurringExpensesQuery)
  const expensesSnapshot = useSnapshot(expensesQuery)

  const [showCreateModal, toggleCreateModal] = useToggle()

  const [editExpense, setEditExpense] = useState(null)
  const [showEditModal, toggleEditModal] = useToggle()

  return (
    <DefaultLayout appBarActive="home">
      <Title>Financify | Home</Title>
      <EditExpenseCard
        expense={editExpense}
        show={showEditModal}
        toggle={toggleEditModal}
      />
      <CreateExpenseModal show={showCreateModal} toggle={toggleCreateModal} />
      <div className="py-16 px-8 text-white bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500">
        <div className="relative">
          <h1 className="text-4xl font-bold tracking-tighter">
            Hello, {user?.displayName}!
          </h1>
          <p>What&apos;s up for today?</p>
          <button
            onClick={toggleCreateModal}
            className="absolute top-0 right-0 text-pink-600 w-8 h-8 bg-white rounded-lg shadow-lg"
          >
            +
          </button>
        </div>
      </div>
      <ExpenseBalance expensesSnapshot={expensesSnapshot} />
      <div className="mb-8 px-4 text-gray-600">
        <div className="mb-4">
          <h2 className="text-gray-900 text-2xl font-bold tracking-tighter">
            Activity
          </h2>
          <p>List of current activities (non recurring)</p>
        </div>
        <ExpensesList
          expensesSnapshot={expensesSnapshot}
          onEditClick={(expense) => {
            setEditExpense(expense)
            toggleEditModal()
          }}
        />
      </div>
      <div className="px-4 text-gray-600">
        <div className="mb-4">
          <h2 className="text-gray-900 text-2xl font-bold tracking-tighter">
            Recurring items
          </h2>
          <p>List of recurring expenses</p>
        </div>
        <ExpensesList
          expensesSnapshot={recurringExpensesSnapshot}
          onEditClick={(expense) => {
            setEditExpense(expense)
            toggleEditModal()
          }}
        />
      </div>
    </DefaultLayout>
  )
}
