import { Link } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export interface KnownComponents {
  Link: FC<PropsWithChildren<{ href: string }>>;
}

export const C: KnownComponents = {
  Link,
};

export const registerComponents = (components: Partial<KnownComponents>) => {
  for (const [key, value] of Object.entries(components)) {
    C[key as keyof KnownComponents] = value;
  }
};
