import { mergeTypes } from 'merge-graphql-schemas';

import health from './health.graphql';
import user from './user.graphql';

export default mergeTypes([health, user], { all: true });
