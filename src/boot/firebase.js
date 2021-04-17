import {initFirebase} from 'src/services/firebase';

export default () => {
  const firebaseInstance = initFirebase(process.env.FIREBASE_CONFIG);
}
