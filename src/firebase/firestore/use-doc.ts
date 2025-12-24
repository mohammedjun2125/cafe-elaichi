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
  useDocument as useDocHook,
  useDocumentData as useDocDataHook,
  useDocumentOnce as useDocOnceHook,
  useDocumentDataOnce as useDocDataOnceHook,
} from 'react-firebase-hooks/firestore';

export const useDoc = useDocHook;
export const useDocData = useDocDataHook;
export const useDocOnce = useDocOnceHook;
export const useDocDataOnce = useDocDataOnceHook;
