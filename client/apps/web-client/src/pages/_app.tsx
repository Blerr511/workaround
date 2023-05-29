import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { HelloWorld } from '@wr/ui';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <HelloWorld />
      <Component {...pageProps} />
    </>
  );
}
