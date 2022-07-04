import {
  collection,
  addDoc,
  serverTimestamp,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore'
import { firestore } from '@/firebase'

export const createExpense = async (expense, userId) => {
  const expensesRef = collection(firestore, 'expenses', userId, 'items')

  const doc = await addDoc(expensesRef, {
    ...expense,
    amount: +expense.amount,
    ownerId: userId,
    createdAt: serverTimestamp(),
  })

  return doc
}

export const updateExpense = async (docId, userId, data) => {
  await updateDoc(doc(firestore, 'expenses', userId, 'items', docId), data)
}

export const deleteExpense = async (docId, userId) => {
  await deleteDoc(doc(firestore, 'expenses', userId, 'items', docId))
}
