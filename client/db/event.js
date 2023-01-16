import { db } from '../firebase-config';
import {
  collection,
  getDocs,
  updateDoc,
  update,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
// import { FieldValue } from 'firebase-admin/firestore';
import firebase from 'firebase/app';

// import { initializeApp } from 'firebase-admin/app';

const eventsRef = collection(db, 'events');

// export async function getEvents() {
//   let events = [];
//   const querySnapshot = await getDocs(eventRef);
//   querySnapshot.forEach((doc) => {
//     console.log('doc is :', doc.id, doc.data());

//     events.push(doc.data());
//   });
//   console.log('data is : ', events);
//   return events;
// }

// get all events
async function getAllEvents() {
  getDocs(eventsRef)
    .then((snapshot) => {
      let events = [];
      snapshot.docs.forEach((doc) => {
        events.push({ ...doc.data(), id: doc.id });
      });
      console.log('events: ', events);
      return events;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

// get one event
async function getOneEvent(eventId) {
  const eventRef = doc(db, 'events', eventId);
  try {
    const eventSnap = await getDoc(eventRef);
    if (!eventSnap.exists()) {
      console.log('Event with this event id does not exists');
    }
    console.log('one event: ', eventSnap.data());
    return eventSnap.data();
  } catch (err) {
    console.log(err);
  }
}

// add a group to an event
async function addGroupToEvent(eventId, groupId) {
  const eventRef = doc(db, 'events', eventId);
  const eventSnap = await getDoc(eventRef);
  const groupIds = eventSnap.data().group_ids;
  // console.log('event from get(): ', groupIds);

  updateDoc(eventRef, {
    group_ids: [...groupIds, groupId],
  });
  // const unionRes = await eventRef
  //   .update({
  //     groups_ids: [...groupIds, groupId],
  //   })
  //   .then(() => {
  //     console.log('The group id was added to the event');
  //   })
  //   .catch((err) => {
  //     console.log(err.message);
  //   });
}

export { getAllEvents, getOneEvent, addGroupToEvent };
