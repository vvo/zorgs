const { table } = require('table');
const chalk = require('chalk');

module.exports = function formatRepositories(repositories) {
  const data = [['Year'], ['Repositories']];
  if (repositories.private > 0) {
    data.push(['Public repositories'], ['Private repositories']);
  }
  Object.entries(repositories.years).forEach(([year, yearRepositories]) => {
    data[0].push(chalk.bold(year));
    data[1].push(yearRepositories.total.toLocaleString());
    if (yearRepositories.private > 0) {
      data[2].push(yearRepositories.private.toLocaleString());
      data[3].push(yearRepositories.public.toLocaleString());
    }
  });
  data[0].push(chalk.bold('All-time'));
  data[1].push(repositories.total.toLocaleString());
  if (repositories.private > 0) {
    data[2].push(repositories.private.toLocaleString());
    data[3].push(repositories.public.toLocaleString());
  }
  return table(data);
};
