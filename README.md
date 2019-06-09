# Serverless Apollo GraphQL

> With DynamoDB Support :rocket:

This is a detached branch containing a DynamoDB support.
Switch to the [master](https://github.com/andreasonny83/serverless-apollo-graphql) branch if you want just the basic GraphQL boilerplate

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

At this point you should have your DynamoDB Admin listening on [http://localhost:8001](http://localhost:8001)
and your GraphQL playground at [http://localhost:3000/graphql](http://localhost:3000/graphql)

Try to run a system health check with the following query:

```graphql
query Health {
  health {
    appName
    status
    message
  }
}
```

### Stop the server
```sh
$ make stop
```

That's it!