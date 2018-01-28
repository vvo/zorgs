const { table } = require('table');
const chalk = require('chalk');

module.exports = function formatCommits(commits) {
  const data = [['Year'], ['Commits']];
  Object.entries(commits.years).forEach(([year, yearCommits]) => {
    data[0].push(chalk.bold(year));
    data[1].push(yearCommits.toLocaleString());
  });
  data[0].push(chalk.bold('All-time'));
  data[1].push(commits.total.toLocaleString());
  return table(data);
};
