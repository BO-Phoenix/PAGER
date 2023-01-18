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
  console.log('data for users : ', users);
  return users;
}

export async function getUser(id) {
  const user = [];
  const userRef = doc(getFS, 'users', id);
  const querySnapshot = await getDoc(userRef);

  user.push(querySnapshot.data());
  console.log('data for one user : ', user);
  return user;
}

export async function addUser(doc) {
  try {
    const docRef = await addDoc(usersRef, doc);
    console.log('document has been added: ', docRef.id, docRef);
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

export async function setUserInfo(id, data) {
  const image = data.profile_pic;
  const imageRef = ref(storage, `images/${image.name}`);
  uploadBytes(imageRef, image)
    .then((result) => {
      console.log('document has been uploaded: ');
      return getDownloadURL(result.ref);
    })
    .then((url) => {
      data.profile_pic = url;
      const userInfoRef = doc(getFS, 'users', id);
      setDoc(userInfoRef, data, { merge: true })
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

export async function addFriend(id1, id2) {
  const user1InfoRef = doc(getFS, 'users', id1);
  const user2InfoRef = doc(getFS, 'users', id2);
  const query1 = await getDoc(user1InfoRef);
  const query2 = await getDoc(user2InfoRef);
  const user1friendInfo = {
    first_name: query1.data().first_name,
    last_name: query1.data().last_name,
    profile_pic: query1.data().profile_pic,
  };
  const user2friendInfo = {
    first_name: query2.data().first_name,
    last_name: query2.data().last_name,
    profile_pic: query2.data().profile_pic,
  };

  await updateDoc(user1InfoRef, {
    friends_list: arrayUnion(user2friendInfo),
  });

  await updateDoc(user2InfoRef, {
    friends_list: arrayUnion(user1friendInfo),
  });
}

export async function deleteFriend(id1, id2) {
  const user1InfoRef = doc(getFS, 'users', id1);
  const user2InfoRef = doc(getFS, 'users', id2);
  const query1 = await getDoc(user1InfoRef);
  const query2 = await getDoc(user2InfoRef);
  const user1friendInfo = {
    first_name: query1.data().first_name,
    last_name: query1.data().last_name,
    profile_pic: query1.data().profile_pic,
  };
  const user2friendInfo = {
    first_name: query2.data().first_name,
    last_name: query2.data().last_name,
    profile_pic: query2.data().profile_pic,
  };

  await updateDoc(user1InfoRef, {
    friends_list: arrayRemove(user2friendInfo),
  });

  await updateDoc(user2InfoRef, {
    friends_list: arrayRemove(user1friendInfo),
  });
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
