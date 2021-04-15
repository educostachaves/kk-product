const process = require('process');
const fs = require('fs');

function TypeOrmConfig() {
  const {
    POSTGRES_HOST: host,
    POSTGRES_PORT: port,
    POSTGRES_DB: database,
    POSTGRES_USER: username,
    POSTGRES_PASSWORD: password,
    POSTGRES_TLS_CERT: tlsCert,
    NODE_ENV: environment,
  } = process.env;

  const migrationsDir = __dirname + `${ environment !== 'development' ? '/dist/db/migrations/**/*.js' : '/db/migrations/**/*.ts'}`;
  const connObj = {
    type: 'postgres',
    host,
    port,
    database,
    username,
    password,
    entities: [ __dirname + `${ environment !== 'development' ? '/dist/src/**/*.entity.js' : '/src/**/*.entity.ts'}` ],
    migrations: [ migrationsDir ],
    synchronize: environment !== 'development' ? false : true,
    dropSchema: false,
    logging: true,
    autoSchemaSync: true,
    migrationsTableName: 'migrations',
    cli: {
      migrationsDir,
    },
  };

  if (environment !== 'development') {
    Object.assign(connObj, {
      ssl: {
        ca: fs.readFileSync(__dirname + `/certs/postgres/${tlsCert}`).toString('utf8'),
      },
    });
  }

  return connObj;
}

module.exports = TypeOrmConfig();
