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

import {
  useCollection as useCollectionHook,
  useCollectionData as useCollectionDataHook,
  useCollectionOnce as useCollectionOnceHook,
  useCollectionDataOnce as useCollectionDataOnceHook,
} from 'react-firebase-hooks/firestore';

export const useCollection = useCollectionHook;
export const useCollectionData = useCollectionDataHook;
export const useCollectionOnce = useCollectionOnceHook;
export const useCollectionDataOnce = useCollectionDataOnceHook;
