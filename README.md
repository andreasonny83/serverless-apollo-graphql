# Serverless Apollo GraphQL

## Prerequisites

This project requires NodeJS, NPM, Doker and DockerCompose.
Node and NPM are really easy to install. To make sure you have them available on your machine, try running the following command.

```sh
$ node -v && npm -v
v10.15.1
6.9.0
```

For Docker, please follow the [official documentation](https://www.docker.com/)

## Installation

Just clone this repo on your machine

```sh
git clone git@github.com:andreasonny83/serverless-apollo-graphql.git
```

And install all the node dependencies with `npm`

```sh
$ make build
```

## Usage

### Start the server

```sh
$ make start
```

### Stop the server
```sh
$ make stop
```

That's it!