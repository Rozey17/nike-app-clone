import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

export const httpLink = createHttpLink({
  uri: process.env.SANITY_GRAPHQL_URI,
});

export const apolloClient = new ApolloClient({
  ssrMode: typeof window === "undefined",
  link: httpLink,
  cache: new InMemoryCache(),
});
