const gql = require('graphql-tag');
module.exports = gql`
  query repositoriesWithCommits(
    $after: String
    $limit: Int = 100
    $organization: String!
    $withCommits: Boolean!
    $commitsSince: GitTimestamp
    $commitsUntil: GitTimestamp
  ) {
    organization(login: $organization) {
      repositories(
        first: $limit
        isFork: false
        orderBy: { field: CREATED_AT, direction: ASC }
        after: $after
      ) {
        edges {
          node {
            isPrivate
            createdAt
            name
            defaultBranchRef @include(if: $withCommits) {
              target {
                ... on Commit {
                  history(since: $commitsSince, until: $commitsUntil) {
                    totalCount
                  }
                }
              }
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;
