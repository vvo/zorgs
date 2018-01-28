const query = require('./queries/repositoriesWithCommits.js');
const queryPaginate = require('./queryPaginate.js');

module.exports = async function getRepositories({ client, organization }) {
  const arrayOfData = await queryPaginate({
    client,
    query,
    variables: {
      organization,
      withCommits: false,
    },
    getPaginationInfo: data => data.data.organization.repositories.pageInfo,
  });

  return arrayOfData.reduce(
    (allRepositories, currentData) => {
      currentData.data.organization.repositories.edges.forEach(
        ({ node: repository }) => {
          /* eslint-disable no-param-reassign */
          const year = repository.createdAt.slice(0, 4);
          if (allRepositories.years[year] === undefined) {
            allRepositories.years[year] = {
              total: 0,
              public: 0,
              private: 0,
            };
          }

          if (repository.isPrivate === true) {
            allRepositories.years[year].private++;
            allRepositories.private++;
          } else {
            allRepositories.years[year].public++;
            allRepositories.public++;
          }

          allRepositories.total++;
          allRepositories.years[year].total++;
        }
      );

      return allRepositories;
    },
    { years: {}, total: 0, public: 0, private: 0 }
  );
};
