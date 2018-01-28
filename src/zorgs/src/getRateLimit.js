const query = require('./queries/rateLimit.js');

module.exports = function getRateLimit({ client }) {
  return client
    .query({ query, fetchPolicy: 'network-only' })
    .then(({ data: { rateLimit: { remaining, limit } } }) => ({
      remaining,
      limit,
    }));
};
