import firebase from 'firebase/app';
import 'firebase/firestore';

let firebaseInstance = null;
let db = null;

export const initFirebase = (config) => {
  if (firebaseInstance !== null) {
    return firebaseInstance;
  }

  if (firebase.apps.length === 0) {
    return firebaseInstance = firebase.initializeApp(config);
  }

  return null;
}

export const getDb = () => {
  if (db) {
    return db;
  }

  return db = firebase.firestore();
}

export const getRecipesCollection = () => {
  return getDb().collection('recipes');
}
