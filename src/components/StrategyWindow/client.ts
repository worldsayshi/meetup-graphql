import {ApolloClient, InMemoryCache} from "@apollo/client";
import {link} from "./link";

export const client = new ApolloClient({
  link,
//  uri: 'http://localhost:8080/v1/graphql',
  cache: new InMemoryCache()
});