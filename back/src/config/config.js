module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.DB_PORT,
    dialect: process.env.DIALECT,
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
}
