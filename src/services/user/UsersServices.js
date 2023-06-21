import { myCollections } from "@/store/constants/firebaseCollections.js";
import { doc, getDocs, addDoc, deleteDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase/init';

const userCollection = collection(db, myCollections.USER_COLLECTION)

class UserServices {
  async getAll() {
    return await getDocs(userCollection);
  }

  async create(user) {
    return await addDoc(userCollection, user);
  }

  update(key, value) {
    return userCollection.child(key).update(value);
  }

  async delete(id) {
    //return await deleteDoc(userCollection, doc.id);
    return await deleteDoc(doc(db, myCollections.USER_COLLECTION, id));
  }
}

export default new UserServices();
