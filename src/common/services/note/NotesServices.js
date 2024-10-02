import { myCollections } from "@/common/constants/firebaseCollections.js";
import { doc, getDocs, addDoc, deleteDoc, updateDoc, collection, query, where, and, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/init';

const notesCollection = collection(db, myCollections.NOTES_COLLECTION)

class NotesServices {
  async getAll() {
    return await getDocs(notesCollection);
  }

  async getNotesByCourse(courseId) {
    const q = query(notesCollection, where('course', '==', courseId));
    return await getDocs(q);
  }

  async getNotesBySections(sectionId) {
    const q = query(notesCollection, where('section', '==', sectionId));
    return await getDocs(q);
  }

  async create(note) {
    return await addDoc(notesCollection, note);
  }

  async update(note) {
    return await updateDoc(doc(db, myCollections.NOTES_COLLECTION, note.id), note);
  }

  async delete(key) {
    return await deleteDoc(doc(db, myCollections.NOTES_COLLECTION, key));
  }
}

export default new NotesServices();
