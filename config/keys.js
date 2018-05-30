module.exports = {
  user: process.env.MONGO_DB_USER_NAME,
  password: process.env.MONGO_DB_USER_PASSWORD,
  mongoURI: function() {
    return `mongodb://${this.user}:${this.password}@ds241530.mlab.com:41530/dev-connect-db`;
  }
};
