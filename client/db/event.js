import {
  collection,
  getDocs,
  updateDoc,
  update,
  doc,
  getDoc,
  setDoc,
  arrayRemove,
} from 'firebase/firestore';
import firebase from 'firebase/app';
import { db } from '../firebase-config';

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
  const events = [];
  await getDocs(eventsRef)
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        events.push({ ...doc.data(), id: doc.id });
      });
      console.log('events: ', events);
    })
    .catch((err) => {
      console.log(err.message);
    });
  return events;
}

// get one event
async function getOneEvent(eventId) {
  const eventRef = doc(db, 'events', eventId);
  try {
    const eventSnap = await getDoc(eventRef);
    if (!eventSnap.exists()) {
      console.log('Event with this event id does not exists');
    }
    // console.log('one event: ', eventSnap.data());
    return eventSnap.data();
  } catch (err) {
    console.log(err);
  }
}

// add a group to an event
async function addGroupToEvent(eventId, groupId) {
  const eventRef = doc(db, 'events', eventId);
  try {
    const eventSnap = await getDoc(eventRef);
    const groupIds = eventSnap.data().group_ids;
    await updateDoc(eventRef, {
      group_ids: [...groupIds, groupId],
    });
    console.log('The group id was added to the event');
  } catch (err) {
    console.log(err);
  }
  // console.log('event from get(): ', groupIds);

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

async function removeGroupFromEvent(eventId, groupId) {
  const eventRef = doc(db, 'events', eventId);
  try {
    const eventSnap = await getDoc(eventRef);
    if (!eventSnap.exists()) {
      console.log('Event with this event id does not exists');
    }
    const groupIds = eventSnap.data().group_ids;
    await updateDoc(eventRef, {
      group_ids: arrayRemove(groupId),
    });
    console.log(
      `The group_id ${groupId} was successfully removed from the group_ids array within event ${eventId}`,
    );
  } catch (err) {
    console.log(err);
  }
}

export { getAllEvents, getOneEvent, addGroupToEvent, removeGroupFromEvent };
