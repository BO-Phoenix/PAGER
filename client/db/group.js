import { db } from '../firebase-config';
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
} from 'firebase/firestore';
import { getStorage, ref } from 'firebase/storage';
import firebase from 'firebase/app';
import { Timestamp } from 'firebase/firestore';

const groupRef = collection(db, 'groups');
const userRef = collection(db, 'users');
const chatRef = collection(db, 'chat');

// get request
export async function getGroupsPerEvent(event_id) {
  console.log('get group per event');
  let groups = [];
  let groups_with_plans = [];
  const q = query(groupRef, where('event_id', '==', 'xNBwjmfV1Vv9T129M0vF'));
  const querySnapshot = await getDocs(q);
  console.log('query snapshot is : ', querySnapshot);

  querySnapshot.forEach((doc) => {
    console.log(doc.id, ' => ', doc.data());
    groups.push({ ...{ id: doc.id }, ...doc.data() });
  });

  for (let i = 0; i < groups.length; i++) {
    let plans = await getGroupPlans();
    groups_with_plans.push({ ...groups[i], ...{ plans: plans } });
  }
  console.log('group with plans : ', groups_with_plans);

  return groups_with_plans;
}

export async function getGroupPlans(group_id) {
  console.log('get group schedules');
  let plans = [];
  const groupScheduleRef = collection(
    db,
    `groups/IrIfBilvP6HSrCHzty9d/schedule`,
  );
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

export async function getGroupMembers(group_id) {
  console.log('get group members');
  let members = [];
  const docRef = doc(db, 'groups', 'uYxp0qUJsR2hGvyBxc78');
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
  let groups = [];
  const docRef = doc(db, 'users', 'DMuiKcBDEA0q95QHzbJq');
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
  let groups = await getGroupsPerUser(user_id);
  let result = [];
  for (let i = 0; i < groups.length; i++) {
    if (groups[i].event_date.toDate() < new Date()) {
      result.push(groups[i]);
    }
  }

  return result;
}

export async function getGroupsUpcommingPerUser(user_id) {
  console.log('get upcoming group');
  let groups = await getGroupsPerUser(user_id);
  let result = [];
  for (let i = 0; i < groups.length; i++) {
    if (groups[i].event_date.toDate() > new Date()) {
      result.push(groups[i]);
    }
  }
  return result;
}

export async function getChatMsgsPerGroup(group_id) {
  console.log('get chat message for specific group');
  let result = [];
  const q = query(chatRef, where('group_id', '==', 'XvRwdkA57VeFh4zcDrlJ'));
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

  storageRef.child('images/stars.jpg').getDownloadURL().then();

  await addDoc(collection(db, 'groups'), {
    event_date: Timestamp.fromDate(new Date('December 10, 1815')),
    event_id: 'xNBwjmfV1Vv9T129M0vF',
    group_image: '',
    group_name: 'Nitrogen',
    member_list: [],
    organizer_name: 'Abby',
    pending_request: [],
    size: 'Medium',
    vibe: 'high',
  }).then(() => console.log('added info'));
}

export async function sendRequestToGroup(user_id, group_id) {
  // update group table
  // update user table
  await setDoc(
    doc(db, 'groups', 'IrIfBilvP6HSrCHzty9d'),
    {
      pending_request: ['ifoibLD2jwtU0zV7dwbs'],
    },
    { merge: true },
  ).then(() => console.log('request received'));
}

export async function acceptInGroup(user_id, group_id) {
  // update group table
  // update user table
  await updateDoc(doc(db, 'groups', 'IrIfBilvP6HSrCHzty9d'), {
    pending_request: arrayRemove('ifoibLD2jwtU0zV7dwbs'),
    member_list: arrayUnion('ifoibLD2jwtU0zV7dwbs'),
  }).then(() => console.log('request approved group side'));

  await setDoc(
    doc(db, 'users', 'ifoibLD2jwtU0zV7dwbs'),
    {
      group_list: ['IrIfBilvP6HSrCHzty9d'],
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
  await updateDoc(doc(db, 'groups', 'IrIfBilvP6HSrCHzty9d'), {
    member_list: arrayUnion('QZ6KFysQsp7CG9DcicIh'),
  }).then(() => console.log('add people to group'));

  await setDoc(
    doc(db, 'users', 'QZ6KFysQsp7CG9DcicIh'),
    {
      group_list: ['IrIfBilvP6HSrCHzty9d'],
    },
    { merge: true },
  ).then(() => console.log('people get added user side'));
}

export async function addPlan(group_id) {
  console.log('add plan for a group');
  await addDoc(collection(db, `groups/IrIfBilvP6HSrCHzty9d/schedule`), {
    time: Date.now(),
    description: 'The last stage',
  }).then(() => console.log('plan added'));
}

export async function deletePlan(group_id, plan_id) {
  await deleteDoc(
    doc(db, `groups/IrIfBilvP6HSrCHzty9d/schedule`, '39VBACWxOKmlGZgtq5k1'),
  ).then(() => console.log('plan deleted'));
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
    created_on: Timestamp.fromDate(new Date('December 10, 1815')),
    group_id: 'IrIfBilvP6HSrCHzty9d',
    message_body: "hey'all, this is the first message",
    reaction: false,
    sender_name: 'abby',
  }).then(() => console.log('added chat message'));
}

// const querySnapshot = await getDocs(groupRef);
// querySnapshot.forEach((doc) => {
//   console.log('doc is :', doc.id, doc.data());
//   // events.push(doc.data());
// });
