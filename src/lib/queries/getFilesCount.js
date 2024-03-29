// @ts-nocheck
import { db } from "$lib/firebaseConfig";
import { collection, getCountFromServer, query, where } from "firebase/firestore";

export async function getFilesCount(uid) {
  const q = query(collection(db, 'files'), where('uid', '==', uid));
  const snapshot = await getCountFromServer(q);
  return snapshot.data().count;
};