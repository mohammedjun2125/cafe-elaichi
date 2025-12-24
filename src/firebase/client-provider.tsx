'use client';

import * as React from 'react';

import { FirebaseProvider, initializeFirebase } from '.';

export function FirebaseClientProvider(props: { children: React.ReactNode }) {
  const firebase = React.useMemo(() => initializeFirebase(), []);
  return <FirebaseProvider {...firebase} {...props} />;
}
