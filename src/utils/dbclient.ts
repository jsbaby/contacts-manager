import {ApolloClient, HttpLink, ApolloClientOptions, InMemoryCache}  from 'apollo-boost';

export const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: '/graphql' }),
  cache: new InMemoryCache(),
  defaultOptions:{
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
  }
});

