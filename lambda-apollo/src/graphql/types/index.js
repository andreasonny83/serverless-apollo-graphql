import { mergeTypes } from 'merge-graphql-schemas';

import user from './user.graphql';

export default mergeTypes([user], { all: true });
