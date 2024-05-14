export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {},
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
  },
});
