export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {},
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
  },
  redis: {
    host: process.env.REDIS_HOST || 'redis',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
  },
});
