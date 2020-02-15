const config = {
  port: process.env.PORT || 3001,
  mongoose: {
    db: 'mongodb://localhost:27017/bookstore',
    options: {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    }
  }
};
module.exports = config;


