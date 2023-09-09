'use client';

import { UIProvider } from '@wr/ui';
import { RecoilRoot } from 'recoil';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UIProvider>
      <RecoilRoot>{children}</RecoilRoot>
    </UIProvider>
  );
}
