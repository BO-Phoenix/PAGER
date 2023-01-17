import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  setDoc,
  addDoc,
  arrayRemove,
  updateDoc,
  arrayUnion,
  deleteDoc,
  Timestamp,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  listAll,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import firebase from 'firebase/app';
import { result } from 'lodash';
import { db, storage } from '../firebase-config';

const groupRef = collection(db, 'groups');
const userRef = collection(db, 'users');
const chatRef = collection(db, 'chat');

// get request

export async function getGroupPlans(group_id) {
  console.log('get group schedules');
  const plans = [];
  const groupScheduleRef = collection(db, `groups/${group_id}/schedule`);
  const q = query(groupScheduleRef);
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, ' => ', doc.data());
    plans.push({ ...{ id: doc.id }, ...doc.data() });
  });
  console.log('plans are : ', plans);
  return plans;
}

export async function getGroupsPerEvent(event_id) {
  console.log('get group per event');
  const groups = [];
  const groups_with_plans = [];
  const q = query(groupRef, where('event_id', '==', event_id));
  const querySnapshot = await getDocs(q);
  console.log('query snapshot is : ', querySnapshot);

  querySnapshot.forEach((doc) => {
    console.log(doc.id, ' => ', doc.data());
    groups.push({ ...{ id: doc.id }, ...doc.data() });
  });

  for (let i = 0; i < groups.length; i++) {
    const plans = await getGroupPlans();
    groups_with_plans.push({ ...groups[i], ...{ plans } });
  }
  console.log('group with plans : ', groups_with_plans);

  return groups_with_plans;
}

export async function getGroupMembers(group_id) {
  console.log('get group members');
  const members = [];
  const docRef = doc(db, 'groups', group_id);
  const docSnap = await getDoc(docRef);
  const members_list = docSnap.data().member_list;

  for (let i = 0; i < members_list.length; i++) {
    const userRef = doc(db, 'users', members_list[i]);
    const userSnap = await getDoc(userRef);
    console.log('get group member detailed info : ', userSnap.data());
    members.push({ ...{ id: userSnap.id }, ...userSnap.data() });
  }
  console.log('members is : ', members);
  return members;
}

export async function getGroupsPerUser(user_id) {
  console.log('get group per user');
  const groups = [];
  const docRef = doc(db, 'users', user_id);
  const docSnap = await getDoc(docRef);
  // console.log('test getdoc : ', docSnap.data().group_list);
  const user_groups = docSnap.data().group_list;
  for (let i = 0; i < user_groups.length; i++) {
    const groupRef = doc(db, 'groups', user_groups[i]);
    const groupSnap = await getDoc(groupRef);
    // console.log('test get group : ', groupSnap.data());
    groups.push({ ...{ id: groupSnap.id }, ...groupSnap.data() });
  }
  console.log('group is : ', groups);
  return groups;
}

export async function getGroupsAttendedPerUser(user_id) {
  console.log('get attended group');
  const groups = await getGroupsPerUser(user_id);
  const result = [];
  for (let i = 0; i < groups.length; i++) {
    if (groups[i].event_date.toDate() < new Date()) {
      result.push(groups[i]);
    }
  }

  return result;
}

export async function getGroupsUpcommingPerUser(user_id) {
  console.log('get upcoming group');
  const groups = await getGroupsPerUser(user_id);
  const result = [];
  for (let i = 0; i < groups.length; i++) {
    if (groups[i].event_date.toDate() > new Date()) {
      result.push(groups[i]);
    }
  }
  return result;
}

export async function getChatMsgsPerGroup(group_id) {
  console.log('get chat message for specific group');
  const result = [];
  const q = query(chatRef, where('group_id', '==', group_id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.id, ' => ', doc.data());
    result.push({ ...{ id: doc.id }, ...doc.data() });
  });
  console.log('result is : ', result);
  return result;
}

// post request
export async function createGroup(form_data) {
  console.log('create group');
  const image = form_data.group_image;
  const imageRef = ref(storage, `image/${image.name}`);
  uploadBytes(imageRef, image)
    .then((result) => {
      console.log('image uploaded');
      return getDownloadURL(result.ref);
    })
    .then((url) => {
      form_data.group_image = url;
      addDoc(collection(db, 'groups'), {
        event_date: Date.now(),
        event_id: form_data.event_id,
        group_image: url,
        group_name: form_data.group_name,
        member_list: [],
        organizer_name: form_data.organizer_name,
        pending_request: [],
        size: form_data.size,
        vibe: form_data.vibe,
      }).then(() => console.log('added info'));
    });
}

export async function sendRequestToGroup(user_id, group_id) {
  // update group table
  // update user table
  await setDoc(
    doc(db, 'groups', group_id),
    {
      pending_request: [user_id],
    },
    { merge: true },
  ).then(() => console.log('request received'));
}

export async function acceptInGroup(user_id, group_id) {
  // update group table
  // update user table
  await updateDoc(doc(db, 'groups', group_id), {
    pending_request: arrayRemove(user_id),
    member_list: arrayUnion(user_id),
  }).then(() => console.log('request approved group side'));

  await setDoc(
    doc(db, 'users', user_id),
    {
      group_list: [group_id],
    },
    { merge: true },
  ).then(() => console.log('request approved user side'));
}

export async function rejectGroup() {
  // update group table
  // update user table
}

export async function invitePeopleToGroup(user_id, group_id) {
  // update group table
  // update user table
  await updateDoc(doc(db, 'groups', group_id), {
    member_list: arrayUnion(user_id),
  }).then(() => console.log('add people to group'));

  await setDoc(
    doc(db, 'users', user_id),
    {
      group_list: [group_id],
    },
    { merge: true },
  ).then(() => console.log('people get added user side'));
}

export async function addPlan(group_id) {
  console.log('add plan for a group');
  await addDoc(collection(db, `groups/${group_id}/schedule`), {
    time: Date.now(),
    description: 'The last stage',
  }).then(() => console.log('plan added'));
}

export async function deletePlan(group_id, plan_id) {
  await deleteDoc(doc(db, `groups/${group_id}/schedule`, plan_id)).then(() =>
    console.log('plan deleted'),
  );
}

export async function deleteGroup(group_id) {
  await deleteDoc(doc(db, 'groups', group_id)).then(() =>
    console.log('group deleted'),
  );
}

export async function addChatMsg(form_data) {
  // update group table
  // update user table
  console.log('add chat message');
  await addDoc(collection(db, 'chat'), {
    created_on: Date.now(),
    group_id: form_data.group_id,
    message_body: form_data.msg,
    reaction: false,
    sender_name: form_data.user_name,
  }).then(() => console.log('added chat message'));
}

// const querySnapshot = await getDocs(groupRef);
// querySnapshot.forEach((doc) => {
//   console.log('doc is :', doc.id, doc.data());
//   // events.push(doc.data());
// });
