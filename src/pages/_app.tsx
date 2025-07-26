// pages/_app.tsx
import '../app/globals.css' // or wherever your tailwind css is
import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
