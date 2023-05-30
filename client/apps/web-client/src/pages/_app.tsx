import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { HelloWorld } from '@wr/ui';
import { MYs } from '@wr/backend-api';
import { ob } from '@/pages/api/test';

console.log(ob);

const my: MYs = {
  email: 'asd',
  id: 123,
  lastName: '1223',
  name: '123',
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <HelloWorld />
      {JSON.stringify(ob)}
      <Component {...pageProps} />
    </>
  );
}
