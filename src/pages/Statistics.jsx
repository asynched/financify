import React, { useMemo } from 'react'
import { collection, query, where } from 'firebase/firestore'

import { firestore } from '@/firebase'
import { partition, sum } from '@/utils/functional'
import { getDateRange } from '@/utils/date'

import useSnapshot from '@/hooks/firebase/useSnapshot'
import useAuth from '@/hooks/firebase/useAuth'

import {
  BarChart,
  Bar,
  YAxis,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import Loading from '@/components/ui/Loading'
import WaitForProperty from '@/components/utils/WaitForProperty'
import DefaultLayout from '@/layouts/DefaultLayout'
import Title from '@/components/utils/Title'

export default function Statistics() {
  const user = useAuth()

  return (
    <WaitForProperty
      property={user}
      beforeDefined={<Loading />}
      afterDefined={<StatisticsPage />}
    />
  )
}

const StatisticsPage = () => {
  const user = useAuth()

  const currentMonthExpensesQuery = useMemo(() => {
    const { current, previous } = getDateRange()

    console.log(current, previous)

    return query(
      collection(firestore, 'expenses', user.uid, 'items'),
      where('createdAt', '<=', current),
      where('createdAt', '>=', previous),
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

  const currentMonthExpensesSnapshot = useSnapshot(currentMonthExpensesQuery)
  const recurringExpensesSnapshot = useSnapshot(recurringExpensesQuery)

  const [recurringIncome, recurringExpenses] = partition(
    recurringExpensesSnapshot,
    (e) => e.amount > 0
  )
  const [income, expenses] = partition(
    currentMonthExpensesSnapshot,
    (e) => e.amount > 0
  )

  const chartData = useMemo(
    () => [
      {
        name: 'Non recurring',
        income: sum(income, (e) => e.amount),
        expense: sum(expenses, (e) => e.amount) * -1,
      },
    ],
    [expenses, income]
  )

  const recurringChartData = useMemo(
    () => [
      {
        name: 'Recurring',
        income: sum(recurringIncome, (e) => e.amount),
        expense: sum(recurringExpenses, (e) => e.amount) * -1,
      },
    ],
    [recurringIncome, recurringExpenses]
  )

  return (
    <DefaultLayout appBarActive="stats">
      <Title>Financify | Statistics</Title>
      <div className="p-8 text-gray-600">
        <h1 className="text-gray-900 text-4xl font-bold tracking-tighter">
          Statistics
        </h1>
        <p>See your profile info in the last days.</p>
      </div>
      <div className="mb-24 w-full h-[16rem]">
        <div className="px-8 mb-4">
          <h2 className="text-3xl font-bold tracking-tighter text-gray-900">
            Non recurring expenses
          </h2>
          <p className="text-gray-600">
            See your list of non recurring expenses
          </p>
        </div>
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <defs>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={1} />
                <stop offset="100%" stopColor="#db2777" stopOpacity={1} />
              </linearGradient>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#84cc16" stopOpacity={1} />
                <stop offset="100%" stopColor="#22c55e" stopOpacity={1} />
              </linearGradient>
            </defs>
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="url(#colorIncome)" />
            <Bar dataKey="expense" fill="url(#colorExpense)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mb-24 w-full h-[16rem]">
        <div className="px-8 mb-4">
          <h2 className="text-3xl font-bold tracking-tighter text-gray-900">
            Recurring expenses
          </h2>
          <p className="text-gray-600">See your list of recurring expenses</p>
        </div>
        <ResponsiveContainer>
          <BarChart data={recurringChartData}>
            <defs>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={1} />
                <stop offset="100%" stopColor="#db2777" stopOpacity={1} />
              </linearGradient>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#84cc16" stopOpacity={1} />
                <stop offset="100%" stopColor="#22c55e" stopOpacity={1} />
              </linearGradient>
            </defs>
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="url(#colorIncome)" />
            <Bar dataKey="expense" fill="url(#colorExpense)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DefaultLayout>
  )
}
