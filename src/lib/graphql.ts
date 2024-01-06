import { ApolloClient, InMemoryCache } from "@apollo/client";

const apiUrl = process.env.EXPO_PUBLIC_SANITY_GRAPHQL_URI || "";
export const client = new ApolloClient({
  uri: apiUrl,
  cache: new InMemoryCache(),
});
