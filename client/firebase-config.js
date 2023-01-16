// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  /// put your firebase config here
  apiKey: 'AIzaSyDvpdu7_BUKuojar2iIkWMTgGZoiPeZ7d4',
  authDomain: 'project-pager-ac1f6.firebaseapp.com',
  projectId: 'project-pager-ac1f6',
  storageBucket: 'project-pager-ac1f6.appspot.com',
  messagingSenderId: '945121037377',
  appId: '1:945121037377:web:ca96792dde4779a84a8ac0',
  measurementId: 'G-YZ1NKNYF1C',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
