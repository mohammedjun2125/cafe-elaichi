'use client';

import { useEffect, useState } from 'react';
import {
  onSnapshot,
  query,
  collection,
  type DocumentData,
  type Query,
  type FirestoreError,
} from 'firebase/firestore';

import { useFirestore } from '@/firebase';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export function useCollection<T = DocumentData>(path: string | null) {
  const db = useFirestore();
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    if (!db || !path) {
      setLoading(false);
      return;
    }

    const q = query(collection(db, path));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as unknown as T)
        );
        setData(docs);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
        const permissionError = new FirestorePermissionError({
          path,
          operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);
      }
    );

    return () => unsubscribe();
  }, [db, path]);

  return { data, loading, error };
}

export function useCollectionData<T = DocumentData>(
  query: Query<T> | null,
  options: { initialValue?: T[] } = {}
) {
  const { initialValue } = options;
  const [data, setData] = useState<T[] | undefined>(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    if (!query) {
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      query,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => doc.data());
        setData(docs);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
        const permissionError = new FirestorePermissionError({
          path: query.path,
          operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);
      }
    );

    return () => unsubscribe();
  }, [query]);

  return { data, loading, error };
}
