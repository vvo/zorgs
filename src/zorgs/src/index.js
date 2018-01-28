const { ApolloClient } = require('apollo-client');
const { HttpLink } = require('apollo-link-http');
const { InMemoryCache } = require('apollo-cache-inmemory');
const { setContext } = require('apollo-link-context');
const fetch = require('node-fetch');

const getRateLimit = require('./getRateLimit.js');
const getRepositories = require('./getRepositories.js');
const getCommits = require('./getCommits.js');

module.exports = function({ organization, token }) {
  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  }));

  const httpLink = new HttpLink({
    uri: 'https://api.github.com/graphql',
    fetch,
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return {
    getRateLimit() {
      return getRateLimit({ client });
    },
    getRepositories() {
      return getRepositories({ client, organization });
    },
    getCommits() {
      return getCommits({ client, organization });
    },
  };
};
