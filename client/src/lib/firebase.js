import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDxjOHfMB5dIHJbTkvSuKrM75CHSHHFl1M',
  authDomain: 'socialmedia-clone-1b8bd.firebaseapp.com',
  projectId: 'socialmedia-clone-1b8bd',
  storageBucket: 'socialmedia-clone-1b8bd.appspot.com',
  messagingSenderId: '840955875647',
  appId: '1:840955875647:web:ce915372f6e78a4070038a'
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };
