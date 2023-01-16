import { db } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import firebase from 'firebase/app';

const eventRef = collection(db, 'events');

export async function getEvents() {
  let events = [];
  const querySnapshot = await getDocs(eventRef);
  querySnapshot.forEach((doc) => {
    console.log('doc is :', doc.id, doc.data());

    events.push(doc.data());
  });
  console.log('data is : ', events);
  return events;
}
