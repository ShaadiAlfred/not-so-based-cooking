import { initFirebase } from 'src/services/firebase';
import firebase from 'firebase/app';
import 'firebase/auth';

export default async () => {
  const firebaseInstance = initFirebase(process.env.FIREBASE_CONFIG);


  if (! firebase.auth().currentUser) {
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    await firebase.auth().signInAnonymously();
  }
}
