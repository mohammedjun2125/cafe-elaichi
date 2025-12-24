'use client';

import * as React from 'react';
import {
  getApp,
  getApps,
  initializeApp,
  type FirebaseApp,
} from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

export interface FirebaseContextValue {
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
}

const FirebaseContext = React.createContext<FirebaseContextValue | undefined>(
  undefined
);

export type FirebaseProviderProps = {
  children: React.ReactNode;
} & Partial<FirebaseContextValue>;

export function FirebaseProvider(props: FirebaseProviderProps) {
  const { app, auth, firestore, children } = props;
  const contextValue = React.useMemo<FirebaseContextValue | undefined>(() => {
    if (app && auth && firestore) {
      return { app, auth, firestore };
    }
  }, [app, auth, firestore]);

  return (
    <FirebaseContext.Provider value={contextValue}>
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  const context = React.useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
}

export function useFirebaseApp() {
  return useFirebase().app;
}

export function useAuth() {
  return useFirebase().auth;
}

export function useFirestore() {
  return useFirebase().firestore;
}
