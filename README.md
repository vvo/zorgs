# 🦑 zorgs

> Command line tool displaying GitHub organizations stats

[![Version][version-svg]][package-url] [![Build Status][travis-svg]][travis-url] [![License][license-image]][license-url] [![Downloads][downloads-image]][downloads-url]

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Installation](#installation)
- [Usage](#usage)
- [Getting a token](#getting-a-token)
- [Contributing](#contributing)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

```sh
npm install -g zorgs-cli
# yarn global add zorgs-cli
```

## Usage

```sh
GH_ORGANIZATION=google GH_TOKEN=... zorgs
```

## Getting a token

To get a token, head over https://github.com/settings/tokens, create a new token named `zorgs` (or any other name)
and allow at least ☑ *read:org* scope and ☑ *public_repo*.

If you want to also get stats from private repositories of your organization, add ☑ *repo* scope.

## Contributing

See [CONTRIBUTING](./.github/CONTRIBUTING.md).

[travis-svg]: https://img.shields.io/travis/vvo/zorgs/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/vvo/zorgs
[license-image]: https://img.shields.io/badge/license-MIT-green.svg?style=flat-square
[license-url]: LICENSE
[downloads-image]: https://img.shields.io/npm/dm/zorgs.svg?style=flat-square
[downloads-url]: http://npm-stat.com/charts.html?package=zorgs
[version-svg]: https://img.shields.io/npm/v/zorgs.svg?style=flat-square
[package-url]: https://yarnpkg.com/en/package/zorgs
