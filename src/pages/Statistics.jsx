import React, { useEffect, useMemo } from 'react'
import { collection } from 'firebase/firestore'

import { firestore } from '@/firebase'
import { partition } from '@/utils/functional'

import useSnapshot from '@/hooks/firebase/useSnapshot'
import useAuth from '@/hooks/firebase/useAuth'

import Loading from '@/components/ui/Loading'
import WaitForProperty from '@/components/utils/WaitForProperty'
import DefaultLayout from '@/layouts/DefaultLayout'

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
  const expensesQuery = useMemo(
    () => collection(firestore, 'expenses', user.uid, 'items'),
    [user]
  )
  const expensesSnapshot = useSnapshot(expensesQuery)

  const [recurringItems, nonRecurringItems] = partition(
    expensesSnapshot,
    (e) => e.recurring
  )

  const [recurringIncome, recurringExpenses] = partition(
    recurringItems,
    (e) => e.amount > 0
  )
  const [nonRecurringIncome, nonRecurringExpenses] = partition(
    nonRecurringItems,
    (e) => e.amount > 0
  )

  useEffect(() => {
    console.log({
      recurringIncome,
      recurringExpenses,
    })
  }, [recurringIncome, recurringExpenses])

  useEffect(() => {
    console.log({
      nonRecurringIncome,
      nonRecurringExpenses,
    })
  }, [nonRecurringIncome, nonRecurringExpenses])

  return (
    <DefaultLayout appBarActive="stats">
      <h1>Hello, world!</h1>
    </DefaultLayout>
  )
}
