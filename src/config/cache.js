export default () => ({
  cache: {
    dialect: process.env.CACHE_DIALECT || 'redis',
    host: process.env.CACHE_HOST || '127.0.0.1',
    port: process.env.CACHE_PORT || 6379,
    db: process.env.CACHE_DB || 0,
    prefix: process.env.CACHE_PREFIX || '',
  },
});
