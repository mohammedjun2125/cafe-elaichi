'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  type ConfirmationResult,
} from 'firebase/auth';
import { useAuth, useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sprout } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
  }
}

export default function LoginPage() {
  const auth = useAuth();
  const { user, loading } = useUser();
  const router = useRouter();
  const { toast } = useToast();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.push('/');
    }
  }, [user, loading, router]);

  const setupRecaptcha = () => {
    if (!auth) return;
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        'recaptcha-container',
        {
          size: 'invisible',
          callback: () => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
          },
        }
      );
    }
  };

  const handleSendOtp = async () => {
    if (!auth) {
      toast({
        variant: 'destructive',
        title: 'Authentication not ready',
        description: 'Please try again in a moment.',
      });
      return;
    }
    if (!/^\+[1-9]\d{1,14}$/.test(phoneNumber)) {
        toast({
            variant: "destructive",
            title: "Invalid Phone Number",
            description: "Please enter a valid phone number with country code (e.g., +919876543210).",
        });
        return;
    }

    setIsSubmitting(true);
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier!;

    try {
      const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(result);
      toast({
        title: 'OTP Sent',
        description: 'Please check your phone for the verification code.',
      });
    } catch (error) {
      console.error('Error sending OTP', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          'Could not send OTP. Please check the phone number or try again.',
      });
       // Reset reCAPTCHA so user can try again
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.render().then(widgetId => {
          // @ts-ignore
          window.grecaptcha.reset(widgetId);
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!confirmationResult) {
      toast({
        variant: 'destructive',
        title: 'Verification failed',
        description: 'Please request an OTP first.',
      });
      return;
    }
    if (otp.length !== 6) {
        toast({
            variant: "destructive",
            title: "Invalid OTP",
            description: "Please enter the 6-digit code sent to your phone.",
        });
        return;
    }

    setIsSubmitting(true);
    try {
      await confirmationResult.confirm(otp);
      toast({
        title: 'Success!',
        description: "You've been logged in.",
      });
      router.push('/');
    } catch (error) {
      console.error('Error verifying OTP', error);
      toast({
        variant: 'destructive',
        title: 'OTP Verification Failed',
        description: 'The code you entered is incorrect. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/50">
      <div id="recaptcha-container"></div>
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-8 w-8">
            <Sprout className="h-full w-full text-primary" />
          </div>
          <CardTitle className="text-2xl">Welcome to Cafe Elaichi</CardTitle>
          <CardDescription>
            {confirmationResult
              ? 'Enter the OTP sent to your phone.'
              : 'Sign in with your phone number.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!confirmationResult ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
              <Button
                onClick={handleSendOtp}
                className="w-full"
                disabled={isSubmitting || !auth}
              >
                {isSubmitting ? 'Sending...' : 'Send OTP'}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">One-Time Password</Label>
                <Input
                  id="otp"
                  type="text"
                  maxLength={6}
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
              <Button
                onClick={handleVerifyOtp}
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Verifying...' : 'Verify OTP & Login'}
              </Button>
               <Button
                variant="link"
                size="sm"
                className="w-full"
                onClick={() => {
                  setConfirmationResult(null);
                  setPhoneNumber('');
                  setOtp('');
                }}
                disabled={isSubmitting}
              >
                Use a different number
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
