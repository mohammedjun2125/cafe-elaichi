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
    grecaptcha?: any;
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
    // Cleanup previous verifier if it exists
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
    }
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      'recaptcha-container',
      {
        size: 'invisible',
        callback: () => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
        'expired-callback': () => {
            // Reset reCAPTCHA
            toast({
              title: "reCAPTCHA expired",
              description: "Please try sending the OTP again.",
              variant: "destructive"
            });
        }
      }
    );
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
    
    const fullPhoneNumber = `+91${phoneNumber}`;
    if (!/^\+91[6-9]\d{9}$/.test(fullPhoneNumber)) {
        toast({
            variant: "destructive",
            title: "Invalid Phone Number",
            description: "Please enter a valid 10-digit Indian mobile number.",
        });
        return;
    }

    setIsSubmitting(true);
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier!;

    try {
      const result = await signInWithPhoneNumber(auth, fullPhoneNumber, appVerifier);
      setConfirmationResult(result);
      toast({
        title: 'OTP Sent',
        description: `A verification code has been sent to ${fullPhoneNumber}.`,
      });
    } catch (error) {
      console.error('Error sending OTP', error);
      toast({
        variant: 'destructive',
        title: 'Error Sending OTP',
        description:
          'Could not send OTP. Please check the number or try again later.',
      });
      // Reset reCAPTCHA so user can try again
      if (window.grecaptcha && window.recaptchaVerifier) {
        window.grecaptcha.reset(window.recaptchaVerifier.widgetId);
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
    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
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
  
  const resetFlow = () => {
    setConfirmationResult(null);
    setPhoneNumber('');
    setOtp('');
    if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
    }
  }


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
              : 'Sign in with your 10-digit Indian phone number.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!confirmationResult ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex items-center gap-2">
                    <div className="flex h-10 w-auto items-center justify-center rounded-md border border-input bg-background px-3">
                        <span className="text-sm text-muted-foreground">+91</span>
                    </div>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="98765 43210"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                      maxLength={10}
                      disabled={isSubmitting}
                      className="flex-1"
                    />
                </div>
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
                  type="tel"
                  maxLength={6}
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
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
                onClick={resetFlow}
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
