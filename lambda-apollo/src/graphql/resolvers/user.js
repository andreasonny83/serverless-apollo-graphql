export default {
  Query: {
    listUsers: async (source, args, { dataSources }, state) => {
      return {
        items: dataSources.userSource(null),
        nextToken: '123',
      };
    },
  },
};
