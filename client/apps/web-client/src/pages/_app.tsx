import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { HelloWorld } from '@wr/ui';
import { MYs } from '@wr/backend-api';

const my: MYs = {
  email: 'asd',
  id: 123,
  lastName: 1223,
};


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <HelloWorld />
      <Component {...pageProps} />
    </>
  );
}
