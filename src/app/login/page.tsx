'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuth, useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sprout } from 'lucide-react';

export default function LoginPage() {
  const auth = useAuth();
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/');
    }
  }, [user, loading, router]);

  const handleSignIn = async () => {
    if (!auth) return;
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/');
    } catch (error) {
      console.error('Error signing in with Google', error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/50">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
           <div className="flex justify-center items-center mb-4">
             <Sprout className="h-8 w-8 text-primary" />
           </div>
          <CardTitle className="text-2xl">Welcome to Cafe Elaichi</CardTitle>
          <CardDescription>Sign in to manage your orders.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" onClick={handleSignIn} disabled={loading || !auth}>
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
