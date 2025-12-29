'use client';

import {
  createContext,
  useContext,
  type ReactNode,
} from 'react';
import { initializeApp, type FirebaseApp } from 'firebase/app';
import {
  getAuth,
  type Auth,
} from 'firebase/auth';
import {
  getFirestore,
  type Firestore,
} from 'firebase/firestore';
import { firebaseConfig } from './config';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';

export type FirebaseServices = {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
};

const FirebaseContext = createContext<FirebaseServices | null>(null);

export const initializeFirebase = (): FirebaseServices => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  return { app, auth, db };
};

export const FirebaseProvider = ({
  children,
  ...services
}: { children: ReactNode } & FirebaseServices) => {
  return (
    <FirebaseContext.Provider value={services}>
      <FirebaseErrorListener />
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  return useContext(FirebaseContext);
};

export const useFirebaseApp = () => {
  const services = useFirebase();
  return services?.app ?? null;
};

export const useAuth = () => {
  const services = useFirebase();
  return services?.auth ?? null;
};

export const useFirestore = () => {
  const services = useFirebase();
  return services?.db ?? null;
};
