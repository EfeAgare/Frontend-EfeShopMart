import { ApolloClient, InMemoryCache, ApolloLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from "@apollo/client/link/context";

// Create an http link:
const httpLink = new createUploadLink({
  uri: 'http://localhost:3000/graphql',
});

const middlewareLink = setContext(() => ({
  headers: {
    'x-token': localStorage.getItem('token'),
  },
}));

const afterwareLink = new ApolloLink((operation, forward) => {
  const { headers } = operation.getContext();

  if (headers) {
    const token = headers.get('x-token');

    if (token) {
      localStorage.setItem('token', token);
    }
  }

  return forward(operation);
});

const httpLinkWithMiddleware = afterwareLink.concat(
  middlewareLink.concat(httpLink)
);

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  httpLinkWithMiddleware
);

export default new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

