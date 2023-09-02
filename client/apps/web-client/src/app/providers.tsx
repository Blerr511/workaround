import { UIProvider } from '@wr/ui';

export function Providers({ children }: { children: React.ReactNode }) {
  return <UIProvider>{children}</UIProvider>;
}
