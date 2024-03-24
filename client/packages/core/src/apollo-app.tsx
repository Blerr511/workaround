import {
  ApolloClient as ApolloClientNative,
  InMemoryCache,
  NormalizedCacheObject,
  ApolloProvider,
} from "@apollo/client";
import React from "react";
import { FC, PropsWithChildren } from "react";

export class ApolloClient extends ApolloClientNative<NormalizedCacheObject> {
  constructor(uri: string) {
    super({
      uri,
      cache: new InMemoryCache(),
    });

    this.provide = this.provide.bind(this);
  }

  provide: FC<PropsWithChildren<unknown>> = ({ children }) => {
    return <ApolloProvider client={this}>{children}</ApolloProvider>;
  };
}
