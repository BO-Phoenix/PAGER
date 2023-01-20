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
    // console.log(doc.id, ' => ', doc.data());
    plans.push({ ...{ id: doc.id }, ...doc.data() });
  });
  console.log('plans are : ', plans);
  return plans;
}

export async function getPendeingRequestPerGroup(group_id) {
  console.log('get pending request');
  const request_with_user_info = [];
  const docRef = doc(db, 'groups', group_id);
  const docSnap = await getDoc(docRef);
  const pending_requests = docSnap.data().pending_request;
  for (let i = 0; i < pending_requests.length; i++) {
    const userRef = doc(db, 'users', pending_requests[i]);
    const userSnap = await getDoc(userRef);
    request_with_user_info.push({
      ...{ id: userSnap.id },
      ...userSnap.data(),
      ...{ group_id },
    });
  }
  console.log('group pending request detailed info : ', request_with_user_info);
  return request_with_user_info;
}

export async function getGroupsPerEvent(event_id) {
  console.log('event_id is : ', event_id);
  console.log('get group per event');
  const groups = [];
  // const groups_with_plans = [];
  const q = query(groupRef, where('event_id', '==', event_id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    //console.log('group info is : ', doc.id, doc.data());
    groups.push({ ...{ id: doc.id }, ...doc.data() });
  });

  // for (let i = 0; i < groups.length; i++) {
  //   const plans = await getGroupPlans(groups[i].id);
  //   const members = await getGroupMembers(groups[i].id);
  //   groups_with_plans.push({ ...groups[i], ...{ plans }, ...{ members } });
  // }
  // console.log('group with plans and members : ', groups_with_plans);

  return groups;
}

export async function getGroupsPerUser(user_id) {
  console.log('get group per user');
  const groups = [];
  const groups_with_plans = [];
  const docRef = doc(db, 'users', user_id);
  const docSnap = await getDoc(docRef);
  const user_groups = docSnap.data().group_list;
  for (let i = 0; i < user_groups.length; i++) {
    const groupRef = doc(db, 'groups', user_groups[i]);
    const groupSnap = await getDoc(groupRef);
    groups.push({ ...{ id: groupSnap.id }, ...groupSnap.data() });
  }

  // for (let i = 0; i < groups.length; i++) {
  //   const plans = await getGroupPlans(groups[i].id);
  //   const members = await getGroupMembers(groups[i].id);
  //   groups_with_plans.push({ ...groups[i], ...{ plans }, ...{ members } });
  // }

  // console.log('groups with plans and members : ', groups_with_plans);
  return groups;
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
    //console.log('get group member detailed info : ', userSnap.data());
    members.push({ ...{ id: userSnap.id }, ...userSnap.data() });
  }
  console.log('members is : ', members);
  return members;
}

export async function getGroup(group_id) {
  console.log('get group info, plans and memebers');
  const docRef = doc(db, 'groups', group_id);
  const docSnap = await getDoc(docRef);
  const group = { ...{ id: docSnap.id }, ...docSnap.data() };
  const plans = await getGroupPlans(group_id);
  const members = await getGroupMembers(group_id);
  const group_with_plan = { ...group, ...{ plans }, ...{ members } };
  console.log('data for one group with plan,members is : ', group_with_plan);
  return group_with_plan;
}

export async function getGroupsAttendedPerUser(user_id) {
  // console.log('get attended group');
  const groups = await getGroupsPerUser(user_id);
  const result = [];
  for (let i = 0; i < groups.length; i++) {
    if (groups[i].event_date.toDate() < new Date()) {
      result.push(groups[i]);
    }
  }
  console.log('attended groups are : ', result);
  return result;
}

export async function getGroupsUpcommingPerUser(user_id) {
  // console.log('get upcoming group');
  const groups = await getGroupsPerUser(user_id);
  const result = [];
  for (let i = 0; i < groups.length; i++) {
    if (groups[i].event_date.toDate() > new Date()) {
      result.push(groups[i]);
    }
  }
  console.log('upcomming groups are : ', result);
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
export async function createGroup(form_data, organizer_id) {
  // console.log('create group');
  const image = form_data.group_image;
  const imageRef = ref(storage, `image/${image.file.name}`);
  uploadBytes(imageRef, image.file)
    .then((result) => {
      console.log('image uploaded with download url', result.ref);
      return getDownloadURL(result.ref);
    })
    .then((url) => {
      form_data.group_image = url;
      addDoc(collection(db, 'groups'), {
        event_date: form_data.event_date,
        event_id: form_data.event_id,
        group_image: url,
        group_name: form_data.group_name,
        member_list: [organizer_id],
        organizer_name: form_data.organizer_name,
        pending_request: [],
        size: form_data.size,
        vibe: form_data.vibe,
        organizer_id: form_data.organizer_id,
        group_description: form_data.group_description,
      }).then(() => console.log('added info'));
    });
}

export async function sendRequestToGroup(user_id, group_id) {
  await updateDoc(doc(db, 'groups', group_id), {
    pending_request: arrayUnion(user_id),
  }).then(() => console.log('request approved group side'));
}

export async function acceptInGroup(user_id, group_id) {
  // update group table
  // update user table
  await updateDoc(doc(db, 'groups', group_id), {
    pending_request: arrayRemove(user_id),
    member_list: arrayUnion(user_id),
  }).then(() => console.log('request approved group side'));

  await updateDoc(doc(db, 'users', user_id), {
    group_list: arrayUnion(group_id),
  }).then(() => console.log('request approved user side'));
}

export async function rejectGroup() {
  // update group table
  // update user table
}

export async function invitePeopleToGroup(user_id, group_id) {
  await updateDoc(doc(db, 'groups', group_id), {
    member_list: arrayUnion(user_id),
  }).then(() => console.log('add people to group'));

  await updateDoc(doc(db, 'users', user_id), {
    group_list: arrayUnion(group_id),
  }).then(() => console.log('request approved user side'));
}

export async function addPlan(group_id, form_data) {
  console.log('add plan for a group');
  await addDoc(collection(db, `groups/${group_id}/schedule`), {
    time: form_data.time,
    description: form_data.description,
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
    created_on: form_data.created_on,
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
