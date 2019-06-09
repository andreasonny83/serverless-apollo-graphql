import { mergeResolvers } from 'merge-graphql-schemas';
import userResolver from './user';
import healthResolver from './health';

const resolvers = [healthResolver, userResolver];

export default mergeResolvers(resolvers);
