
export default () => ({
  database: {
    uri: `mongodb://${process.env.DB_HOST || '127.0.0.1'}:${process.env.DB_PORT || 27017}/${process.env.DB_NAME || 'nest'}`,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    auth: process.env.DB_USER ? {
      user: process.env.DB_USER || null,
      password: process.env.DB_PASSWORD || null,
    } : null,
  },
});
