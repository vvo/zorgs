module.exports = function queryPaginate({
  client,
  query,
  variables,
  getPaginationInfo,
  arrayOfData = [],
}) {
  return client.query({ query, variables }).then(data => {
    const { endCursor, hasNextPage } = getPaginationInfo(data);
    const newArrayOfData = [...arrayOfData, data];
    if (hasNextPage === true) {
      return queryPaginate({
        client,
        query,
        variables: {
          ...variables,
          after: endCursor,
        },
        arrayOfData: newArrayOfData,
        getPaginationInfo,
      });
    }

    return newArrayOfData;
  });
};
