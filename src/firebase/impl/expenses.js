import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { firestore } from '@/firebase'

export const createExpense = async (expense, userId) => {
  const expensesRef = collection(firestore, 'expenses')

  const doc = await addDoc(expensesRef, {
    ...expense,
    amount: +expense.amount,
    ownerId: userId,
    createdAt: serverTimestamp(),
  })

  return doc
}
