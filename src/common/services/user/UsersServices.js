import { myCollections } from "@/common/constants/firebaseCollections.js";
import { doc, getDocs, addDoc, deleteDoc, updateDoc, collection, query, where, and, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/init';

const userCollection = collection(db, myCollections.USER_COLLECTION)

class UserServices {
  async getAll() {
    return await getDocs(userCollection);
  }

  async getStudentByDoc(doc) {
    const q = query(userCollection, where('doc', '==', doc));
    return await getDocs(q);
  }

  async create(user) {
    return await addDoc(userCollection, user);
  }

  async update(user) {
    return await updateDoc(doc(db, myCollections.USER_COLLECTION, user.id), user);
  }

  async delete(key) {
    return await deleteDoc(doc(db, myCollections.USER_COLLECTION, key));
  }
}

export default new UserServices();
