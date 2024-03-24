"use client";
import { UIProvider } from "@wr/ui";
import { RecoilRoot } from "recoil";
import { Client } from "./apollo/apollo-client";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Client.provide>
      <UIProvider>
        <RecoilRoot>{children}</RecoilRoot>
      </UIProvider>
    </Client.provide>
  );
}
