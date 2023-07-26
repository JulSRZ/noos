import { myCollections } from "@/common/constants/firebaseCollections.js";
import { doc, getDocs, addDoc, deleteDoc, updateDoc, collection, query, where, and, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/init';

const financialCollection = collection(db, myCollections.FINANCIAL_COLLECTION)

class FinancialServices {
  async getAll() {
    return await getDocs(financialCollection);
  }

  async getfinancialStateByID(id) {
    const q = query(financialCollection, where('id', '==', id));
    return await getDocs(q);
  }

  async create(financialState) {
    return await addDoc(financialCollection, financialState);
  }

  async update(financialState) {
    return await updateDoc(doc(db, myCollections.FINANCIAL_COLLECTION, financialState.id), financialState);
  }

  async delete(key) {
    return await deleteDoc(doc(db, myCollections.FINANCIAL_COLLECTION, key));
  }
}

export default new FinancialServices();
