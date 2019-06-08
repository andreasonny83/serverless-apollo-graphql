import { mergeResolvers } from 'merge-graphql-schemas';
import userResolver from './user';

const resolvers = [userResolver];

export default mergeResolvers(resolvers);
