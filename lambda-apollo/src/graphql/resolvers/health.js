import randomString from 'crypto-random-string';
import pkg from '../../../package.json';

export default {
  Query: {
    health: () => ({
      appName: pkg.name,
      status: 'OK',
      message: new Array(3)
        .fill()
        .reduce(
          acc => (acc ? `${acc}-${randomString({ length: 4 })}` : `${randomString({ length: 4 })}`),
          null,
        ),
    }),
  },
};
