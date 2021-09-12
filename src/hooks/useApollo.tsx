import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";

import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";

const BASE_API = process.env.REACT_APP_BASE_API || "http://localhost:8000";

const BASE_WS = process.env.REACT_APP_BASE_WS || "ws://localhost:8000";

const httpLink = createHttpLink({
  uri: `${BASE_API}/graphql`,
});

const wsLink = new WebSocketLink({
  uri: `${BASE_WS}/graphql`,
  options: {
    reconnect: true,
  },
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
