import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from '@firebase/firestore';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

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
  }
};

export const database = getFirestore(app);

const messagesCollection = collection(database, 'messages');

export const getMessages = async () => {
  const recentMessagesQuery = query(messagesCollection, orderBy('timestamp'));
  const receiveMessages = [];

  onSnapshot(recentMessagesQuery, function (snapshot) {
    snapshot.docChanges().forEach(function (change) {
      let message = change.doc.data();

      const id = change.doc.id;
      const timestamp = message.timestamp;
      const name = message.name;
      const text = message.text;
      const profilePicture = message.profilePicUrl;

      receiveMessages.push({
        id,
        timestamp,
        name,
        text,
        profilePicture,
      });
    });
  });
  return receiveMessages;
};
