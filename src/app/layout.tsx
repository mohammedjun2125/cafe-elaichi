import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/context/cart-context';
import { FirebaseClientProvider } from '@/firebase';

export const metadata: Metadata = {
  title: 'Cafe Elaichi | A Refreshing Café Experience',
  description: 'Welcome to Cafe Elaichi. We offer fresh beverages, signature chai, and a cozy ambiance. Perfect for friends, dates, or work sessions.',
  openGraph: {
    title: 'Cafe Elaichi',
    description: 'A Refreshing Café Experience in a cozy, premium setting.',
    url: 'https://cafe-elaichi.example.com', // Replace with actual URL
    siteName: 'Cafe Elaichi',
    images: [
      {
        url: 'https://picsum.photos/seed/og-image/1200/630', // Replace with actual OG image
        width: 1200,
        height: 630,
        alt: 'A cozy interior of Cafe Elaichi',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cafe Elaichi',
    description: 'A Refreshing Café Experience in a cozy, premium setting.',
    // images: ['https://...'], // Replace with actual Twitter image
  },
  // No favicon is included as per the request.
  // To add one, uncomment the following lines and add your favicon files to the `public` directory.
  // icons: {
  //   icon: '/favicon.ico',
  //   shortcut: '/favicon-16x16.png',
  //   apple: '/apple-touch-icon.png',
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <FirebaseClientProvider>
          <CartProvider>
            {children}
            <Toaster />
          </CartProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
