import randomString from 'crypto-random-string';

export default {
  Query: {
    listUsers: async (source, args, { dataSources }, state) => {
      const { nextToken, limit } = args;
      const { dynamoSource } = dataSources;
      const db = await dynamoSource.getDatabase();
      const maxLimit = 10;
      const setLimit = limit && limit < maxLimit ? limit : maxLimit;

      const params = {
        TableName: 'users',
        Select: 'SPECIFIC_ATTRIBUTES',
        ProjectionExpression: 'id, #name',
        ExpressionAttributeNames: {
          '#name': 'name',
        },
        Limit: setLimit,
      };

      if (nextToken) {
        params.ExclusiveStartKey = {
          id: nextToken.toString(),
        };
      }

      let result = {};
      try {
        result = await db.scan(params);
      } catch (e) {
        result.error = 'Internal error';
        throw new Error(e.message || e);
      }

      return result;
    },

    getUser: async (source, args, { dataSources }, state) => {
      const { id } = args;
      const { dynamoSource } = dataSources;
      const db = await dynamoSource.getDatabase();

      let result = {};
      try {
        result = await db.getItem({
          TableName: 'users',
          Key: { id: id.toString() },
        });
      } catch (e) {
        result.error = 'Internal error';
        throw new Error(e.message || e);
      }

      if (result.Item) {
        return result.Item;
      }

      throw new Error('Item not found');
    },
  },

  Mutation: {
    createUser: async (source, args, { dataSources }, state) => {
      const { dynamoSource } = dataSources;
      const { input } = args;
      const { name } = input;
      const db = await dynamoSource.getDatabase();
      const item = {
        id: randomString({ length: 12 }),
        name,
      };

      let result = {};
      try {
        result = await db.putItem({
          TableName: 'users',
          Item: item,
        });
      } catch (e) {
        console.error(e);
        result.error = 'Internal error';
      }

      return item;
    },
  },

  ModelUserConnection: {
    items: parent => parent.Items,
    nextToken: parent => parent.LastEvaluatedKey && parent.LastEvaluatedKey.id,
    count: async (parent, args, { dataSources }) => {
      const { dynamoSource } = dataSources;
      const db = await dynamoSource.getDatabase();

      const params = {
        TableName: 'users',
        Select: 'COUNT',
      };

      let result = {};
      try {
        result = await db.scan(params);
      } catch (e) {
        result.error = 'Internal error';
        throw new Error(e.message || e);
      }

      return result.Count;
    },
  },
};
