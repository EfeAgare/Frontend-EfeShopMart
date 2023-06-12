import { ApolloClient, InMemoryCache, ApolloLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { createUploadLink } from 'apollo-upload-client';
// import { WebSocketLink } from '@apollo/client/link/ws';

// Create an http link:
const httpLink = createUploadLink({
  uri: 'http://127.0.0.1:3000/graphql',
});

// Create a WebSocket link for subscriptions:
// const wsLink = new WebSocketLink({
//   uri: 'ws://127.0.0.1:3000/graphql',
//   options: {
//     reconnect: true,
//   },
// });

const afterwareLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }) => ({
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      ...headers,
    },
  }));

  return forward(operation).map(response => {
    const { response: { headers } } = operation.getContext();

    if (headers) {
      const token = headers.get('token');

      if (token) {
        localStorage.setItem('token', token);
      }
    }

    return response;
  });
});

const additiveLink = afterwareLink.concat(httpLink);

const link = split(
  // Split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition'
      //  &&
      // definition.operation === 'subscription'
    );
  },
  // wsLink,
  additiveLink
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // Add field policies for specific query fields if needed
          // fetchAllProducts: {
//             keyArgs: false,

//             merge(existing = [], incoming) {
//               console.log("existing", existing)
//               console.log("incoming", incoming)
//               return [...existing, ...incoming?.products
// ];
//             },

            // keyArgs: [],
            // merge(existing, incoming, { args: { page = 0 } }) {
            //   // Slicing is necessary because the existing data is
            //   // immutable, and frozen in development.
            //   const merged = existing ? existing.slice(0) : [];
            //   console.log("merge", merged)
            //   for (let i = 0; i < incoming?.products?.length; ++i) {
            //     console.log("merge", merged[page + i])
            //     merged[page + i] = incoming?.products[i];
            //   }
            //   return merged;
            // },
          // }
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-first',
    },
  },
});

export default client;
