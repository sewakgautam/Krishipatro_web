// pages/_app.tsx (for Pages Router) 
// OR
// app/layout.tsx (for App Router)


import type { AppProps } from 'next/app';
import '../app/globals.css'; // Your global styles
import { AuthProvider } from '@/contexts/firebaseauthcontext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;

// For App Router (app/layout.tsx), use this instead:
/*
import { AuthProvider } from '../contexts/AuthContext';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
*/
