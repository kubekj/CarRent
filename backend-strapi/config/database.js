// const Database = require('better-sqlite3');
// const { userInfo } = require('os');
// const path = require('path');

module.exports = ({ env }) => ({
  connection: {
    client: 'mysql',
    connection: {
      // filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
        host: 'cms-warsztat-db.mysql.database.azure.com',
        port: 3306,
        database: 'strapi',
        user: 'lech',
        password: 'Marszalkowska8!',
    },
    useNullAsDefault: true,
  },
});
