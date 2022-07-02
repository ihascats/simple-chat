import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from '@firebase/firestore';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCsuCPeZLc4UCyMRhKOco6eJUHRgnUUFjE',
  authDomain: 'simplechatlearning.firebaseapp.com',
  projectId: 'simplechatlearning',
  storageBucket: 'simplechatlearning.appspot.com',
  messagingSenderId: '621414766932',
  appId: '1:621414766932:web:4ee8f45f398dce1f2c10c1',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const info = await signInWithPopup(auth, provider);
    return info;
  } catch (error) {
    console.log(error);
    // some error handling i cant be bothered about right now
  }
};

export const database = getFirestore(app);

const messagesCollection = collection(database, 'messages');

class CurrentUser {
  constructor() {
    this.name = undefined;
    this.email = undefined;
    this.picture = undefined;
  }

  setName(name) {
    this.name = name;
  }
  setEmail(email) {
    this.email = email;
  }
  setPicture(picture) {
    this.picture = picture;
  }
}

export const user = new CurrentUser();

export const sendMessage = async (text) => {
  try {
    await addDoc(messagesCollection, {
      name: user.name,
      text: text,
      profilePicUrl: user.picture,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error writing new message to Firebase Database', error);
  }
};
