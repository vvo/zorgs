#!/usr/bin/env node

/* eslint-disable no-console, no-process-exit */

const ora = require('ora');
const chalk = require('chalk');
const boxen = require('boxen');
const zorgs = require('zorgs');

const formatRateLimit = require('./formatters/formatRateLimit.js');
const formatRepositories = require('./formatters/formatRepositories.js');
const formatCommits = require('./formatters/formatCommits.js');

const spinner = ora();
const log = console.log;
const organization = process.env.GH_ORGANIZATION;
const token = process.env.GH_TOKEN;

if (organization === undefined || token === undefined) {
  console.error(
    `🦑  zorgs:

  ${chalk.underline('Error:')} Please provide ${chalk.bold(
      'GH_ORGANIZATION'
    )} and ${chalk.bold('GH_TOKEN')} environment variables

  ${chalk.underline('Usage:')} GH_ORGANIZATION=google GH_TOKEN=... zorgs

  ${chalk.underline(
    'Advice:'
  )} You can generate a GitHub token on https://github.com/settings/tokens,
  add ☑ repo scope to get private repositories information for the organizations
  you have access to.`
  );
  process.exit(1);
}

async function run() {
  const data = zorgs({
    organization,
    token,
  });

  log(
    boxen(
      `${chalk.bold('🦑  zorgs')}\n${chalk.italic(
        'GitHub organizations stats'
      )}`,
      { align: 'center', padding: 1 }
    )
  );
  log('');
  log(
    `${chalk.underline(
      'Current organization:'
    )} https://github.com/${organization}`
  );
  spinner.start('Computing rate limit');
  const startLimit = formatRateLimit(await data.getRateLimit());
  spinner.stop();
  log(`${chalk.underline('GitHub rate limit:')} ${startLimit}`);
  log('');

  spinner.start('Computing repositories');
  const repositories = formatRepositories(await data.getRepositories());
  spinner.stop();
  log(chalk.underline('Repositories created per year:'));
  log(repositories);

  spinner.start('Computing commits');
  const commits = formatCommits(await data.getCommits());
  spinner.stop();
  log(chalk.underline('Commits pushed per year:'));
  log(commits);
  log('');

  spinner.start('Computing rate limit');
  const endLimit = formatRateLimit(await data.getRateLimit());
  spinner.stop();
  log(`${chalk.underline('GitHub rate limit:')} ${endLimit}`);
  log('');
}

run().catch(error => {
  console.error(error);
  process.exit(1);
});
