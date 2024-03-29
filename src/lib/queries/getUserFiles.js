// @ts-nocheck
import { db } from "$lib/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getUserFiles(uid) {
  const q = query(collection(db, 'files'), where('uid', '==', uid));
  const querySnapshot = await getDocs(q);
  const results = [];
  querySnapshot.forEach(doc => {
    results.push({
      fileName: doc.data().fileName,
      size: doc.data().size,
      type: doc.data().type,
      uid: doc.data().uid,
      downloadUrl: doc.data().downloadUrl,
      timestamp: doc.data().timestamp.toDate(),
      id: doc.id
    });
  });
  return results;
};