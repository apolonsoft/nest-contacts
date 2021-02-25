# Nestjs Contacts application

* Node v12.17.0

## Installation

```bash
$ npm install
```

## Running the app

```bash
# if your default nodeJS version is not v12.17.0
$ nvm use 

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Release

```bash
# for first release. Create tag and changelog, but skip version bumping
$ npm run first-release

# tag, changelog and version bump
$ npm run release
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
