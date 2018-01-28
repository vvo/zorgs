const gql = require('graphql-tag');

module.exports = gql`
  query getRateLimit {
    rateLimit {
      limit
      remaining
    }
  }
`;
