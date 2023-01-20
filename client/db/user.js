import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  doc,
  getFirestore,
  FieldValue,
  arrayUnion,
  arrayRemove,
  updateDoc,
  query,
  where,
} from 'firebase/firestore';
import firebase from 'firebase/app';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { storage, db } from '../firebase-config.js';

const usersRef = collection(db, 'users');
const getFS = getFirestore();

export async function getUsers() {
  const users = [];
  const querySnapshot = await getDocs(usersRef);
  querySnapshot.forEach((doc) => {
    // console.log('doc is :', doc.id, doc.data());

    users.push(doc.data());
  });
  // console.log('data for users : ', users);
  return users;
}

export async function getUser(id) {
  const user = [];
  const userRef = doc(getFS, 'users', id);
  const querySnapshot = await getDoc(userRef);

  user.push(querySnapshot.data());
  // console.log('data for one user : ', user);
  return user;
}

export async function addUser(doc) {
  try {
    const docRef = await addDoc(usersRef, doc);
    return docRef.id;
  } catch (err) {
    console.error(err);
  }
}

export async function getUserByEmail(email) {
  try {
    const userRef = collection(getFS, 'users');
    const query1 = await query(userRef, where('email', '==', email));
    const querySnapshot = await getDocs(query1);
    let userDocId = '';
    querySnapshot.forEach((data) => {
      userDocId = data.id;
    });
    return userDocId;
  } catch (err) {
    console.log(err);
  }
}

export async function setUserInfo(id, data, obj) {
  // console.log('the id and the data being passed', id, data, obj);
  const image = data.file;
  const imageRef = ref(storage, `image/${image.name}`);
  uploadBytes(imageRef, image)
    .then((result) => {
      console.log('document has been uploaded: ');
      return getDownloadURL(result.ref);
    })
    .then((url) => {
      // console.log('the url being passed in setUserInfo', url);
      const userInfoRef = doc(getFS, 'users', id);
      // console.log('this is userInfoRef ', userInfoRef);
      updateDoc(userInfoRef, { ...obj, profile_pic: url })
        .then((docRef) => {
          console.log('document has been updated: ');
        })
        .catch((err) => {
          console.error(err);
        });
    })
    .catch((err) => {
      console.error(err);
    });
}

export async function editUserData(id, data) {
  // console.log('data from back end:', id, data);
  const docRef = await doc(db, 'users', id);
  updateDoc(docRef, data)
    .then((docRef) => {
      console.log('doc with this id was updated successfully');
    })
    .catch((err) => console.log(err));
}

export async function addFriend(id1, id2) {
  try {
    const user1InfoRef = await doc(getFS, 'users', id1);
    const user2InfoRef = await doc(getFS, 'users', id2);

    const query1 = await getDoc(user1InfoRef);
    const query2 = await getDoc(user2InfoRef);

    const user1 = await query1.data();
    const user2 = await query2.data();

    const user1friendInfo = {
      first_name: user1.first_name,
      last_name: user1.last_name,
      profile_pic: user1.profile_pic,
      id: id1,
    };
    const user2friendInfo = {
      first_name: user2.first_name,
      last_name: user2.last_name,
      profile_pic: user2.profile_pic,
      id: id2,
    };
    // console.log('objects: ', user1friendInfo, user2friendInfo);
    await updateDoc(user1InfoRef, {
      friends_list: arrayUnion(user2friendInfo),
    });
    await updateDoc(user2InfoRef, {
      friends_list: arrayUnion(user1friendInfo),
    });
    // return await query1.data();
  } catch (err) {
    console.log(err);
  }
}

export async function deleteFriend(id1, id2) {
  // console.log(id1, id2, 'ids');
  try {
    const user1InfoRef = await doc(getFS, 'users', id1);
    const user2InfoRef = await doc(getFS, 'users', id2);

    const query1 = await getDoc(user1InfoRef);
    const query2 = await getDoc(user2InfoRef);

    const user1 = await query1.data();
    const user2 = await query2.data();

    const user1friendInfo = {
      first_name: user1.first_name,
      last_name: user1.last_name,
      profile_pic: user1.profile_pic,
      id: id1,
    };
    const user2friendInfo = {
      first_name: user2.first_name,
      last_name: user2.last_name,
      profile_pic: user2.profile_pic,
      id: id2,
    };
    // console.log('objects: ', user1friendInfo, user2friendInfo);
    await updateDoc(user1InfoRef, {
      friends_list: arrayRemove(user2friendInfo),
    });
    await updateDoc(user2InfoRef, {
      friends_list: arrayRemove(user1friendInfo),
    });
    // return await query1.data();
  } catch (err) {
    console.log(err);
  }

  // const friendRef1 = await doc(getFS, 'users', id1);
  // console.log(friendRef1);
  // const friend1Snap = await getDoc(friendRef1);
  // console.log(friend1Snap.data());
  // try {
  //   const friend1Snap = await getDoc(friendRef1);
  //   // if (!friend1Snap.exists()) {
  //   //   console.log('user with this event id does not exists');
  //   // }
  //   console.log('friendSnap1: ', friend1Snap.data());
  //   // return eventSnap.data();
  // } catch (err) {
  //   console.log(err);
  // }
}

// const newUser = {
//   birthday: 'January 23 1997',
//   description: '',
//   email: 'Wavy@yahoo.com',
//   user_name: 'Wavy123',
//   first_name: 'Wavy',
//   last_name: 'JV',
//   friends_list: [],
//   group_list: [],
//   music_tastes: [],
//   password: 'password123',
//   profile_pic: '',
// };

// const newUserInfo = {
//   profile_pic: 'Update Test',
//   description: 'This is to test the update userInfo function',
//   music_tastes: ['Garage', 'Trap'],
// };

// const [users, setUsers] = useState([]);
// const [oneUser, setOneUser] = useState([]);
// const [image, setImage] = useState(null);
// const [imageList, setImageList] = useState([]);

// const imageListRef = ref(storage, 'images/');
// const uploadImage = () => {
//   if (image == null) {
//     return;
//   }
//   const newInfo = {
//     profile_pic: image,
//     music_tastes: ['Garage', 'Trap'],
//   };

//   setUserInfo('DMuiKcBDEA0q95QHzbJq', newInfo);
// };

// listAll(imageListRef).then((response) => {
//   console.log(response);
//   response.items.forEach((item) => {
//     console.log(item);
//     getDownloadURL(item).then((url) => {
//       setImageList((prev) => [...prev, url]);
//     });
//   });
// });

/* <input
        type="file"
        onChange={(e) => {
          setImage(e.target.files[0]);
        }}
      />
      <button onClick={uploadImage}> Upload Image</button>
      {imageList.map((url) => {
        return <img src={url} />;
      })} */
