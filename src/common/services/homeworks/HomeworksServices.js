import { myCollections } from "@/common/constants/firebaseCollections.js";
import { doc, getDocs, addDoc, deleteDoc, updateDoc, collection, query, where, and, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/init';

const homeworksCollection = collection(db, myCollections.HOMEWORKS_COLLECTION)

class HomeworksServices {
  async getAll() {
    return await getDocs(homeworksCollection);
  }

  async getHomeworksByCourse(courseId) {
    const q = query(homeworksCollection, where('course', '==', courseId));
    return await getDocs(q);
  }

  async getHomeworksBySections(sectionId) {
    const q = query(homeworksCollection, where('section', '==', sectionId));
    return await getDocs(q);
  }

  async create(note) {
    return await addDoc(homeworksCollection, note);
  }

  async update(note) {
    return await updateDoc(doc(db, myCollections.HOMEWORKS_COLLECTION, note.id), note);
  }

  async delete(key) {
    return await deleteDoc(doc(db, myCollections.HOMEWORKS_COLLECTION, key));
  }
}

export default new HomeworksServices();
