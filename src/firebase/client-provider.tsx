'use client';

import { ReactNode } from 'react';
import {
  initializeFirebase,
  FirebaseProvider,
  type FirebaseServices,
} from '@/firebase/provider';

let firebaseServices: FirebaseServices | null = null;

export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  if (!firebaseServices) {
    firebaseServices = initializeFirebase();
  }

  return <FirebaseProvider {...firebaseServices}>{children}</FirebaseProvider>;
}
