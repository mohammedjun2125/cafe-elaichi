// This file is the single source of truth for all Firebase services
// and should be used to import all Firebase related services.
//
// e.g.
//
// `import { auth, firestore } from '@/firebase'`
//
// `import { useUser, useDoc } from '@/firebase'`
//

'use client';

import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { connectAuthEmulator, getAuth, type Auth } from 'firebase/auth';
import {
  connectFirestoreEmulator,
  getFirestore,
  type Firestore,
} from 'firebase/firestore';
import { firebaseConfig } from './config';
import {
  useCollection,
  useCollectionData,
  useCollectionOnce,
  useCollectionDataOnce,
} from './firestore/use-collection';
import { useDoc, useDocOnce, useDocData, useDocDataOnce } from './firestore/use-doc';
import { useUser } from './auth/use-user';
import {
  FirebaseProvider,
  useFirebaseApp,
  useFirestore,
  useAuth,
} from './provider';
import { FirebaseClientProvider } from './client-provider';

// Note: You can also use the following functions to get the Firebase services.
//
// `const { app, auth, firestore } = getFirebase()`
// `const { app, auth, firestore } = useFirebase()`
//
// Or you can get them individually.
//
// `const app = useFirebaseApp()`
// `const auth = useAuth()`
// `const firestore = useFirestore()`

function initializeFirebase(): {
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
} {
  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  return { app, auth, firestore };
}

export {
  initializeFirebase,
  FirebaseProvider,
  FirebaseClientProvider,
  useCollection,
  useCollectionData,
  useCollectionOnce,
  useCollectionDataOnce,
  useDoc,
  useDocOnce,
  useDocData,
  useDocDataOnce,
  useUser,
  useFirebaseApp,
  useFirestore,
  useAuth,
};
