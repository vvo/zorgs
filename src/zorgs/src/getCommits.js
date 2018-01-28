const query = require('./queries/repositoriesWithCommits.js');
const queryPaginate = require('./queryPaginate.js');

module.exports = async function getRepositories({ client, organization }) {
  const firstRepository = await client.query({
    query,
    variables: {
      organization,
      limit: 1,
      withCommits: false,
    },
  });
  const startYear = firstRepository.data.organization.repositories.edges[0].node.createdAt.slice(
    0,
    4
  );
  const currentYear = new Date().getFullYear();
  const commits = { total: 0, years: {} };
  for (let year = startYear; year <= currentYear; year++) {
    const arrayOfData = await queryPaginate({
      client,
      query,
      variables: {
        organization,
        limit: 50,
        withCommits: true,
        commitsSince: `${year}-01-01T00:00:00Z`,
        commitsUntil: `${year}-12-31T23:59:59Z`,
      },
      getPaginationInfo: data => data.data.organization.repositories.pageInfo,
    });

    commits.years[year] = arrayOfData.reduce((yearCommits, currentData) => {
      let yearCommitsForPage = 0;
      currentData.data.organization.repositories.edges.forEach(
        ({ node: repository }) => {
          if (repository.defaultBranchRef === null) {
            return;
          }

          const repositoryCommits =
            repository.defaultBranchRef.target.history.totalCount;

          yearCommitsForPage += repositoryCommits;
          commits.total += repositoryCommits;
        }
      );

      return yearCommits + yearCommitsForPage;
    }, 0);
  }

  return commits;
};
