import { ApolloClient } from "@wr/core";
import { clientConfig } from "../config/config";

export const Client = new ApolloClient(clientConfig.apiUrl);
