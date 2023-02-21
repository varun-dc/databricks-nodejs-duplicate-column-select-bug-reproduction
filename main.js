const { DBSQLClient } = require('@databricks/sql');

var token          = process.env.DATABRICKS_TOKEN;
var serverHostname = process.env.DATABRICKS_SERVER_HOSTNAME;
var httpPath       = process.env.DATABRICKS_HTTP_PATH;

if (!token || !serverHostname || !httpPath) {
  throw new Error("Cannot find Server Hostname, HTTP Path, or personal access token. " +
                  "Check the environment variables DATABRICKS_TOKEN, " +
                  "DATABRICKS_SERVER_HOSTNAME, and DATABRICKS_HTTP_PATH.");
}

function runQuery(query) {
  const client = new DBSQLClient();

  client.connect(
    options = {
      token: token,
      host:  serverHostname,
      path:  httpPath
    }).then(
      async client => {
        const session = await client.openSession();

        const queryOperation = await session.executeStatement(
          statement = query,
          options   = {
            runAsync: true,
            maxRows: 10000 // This option enables the direct results feature.
          }
        );

        const result = await queryOperation.fetchAll({
          progress: false,
          callback: () => {},
        });

        await queryOperation.close();

        console.table(result);

        await session.close();
        await client.close();
  }).catch((error) => {
    console.log(error);
  });
}

runQuery('SELECT carat as a, color as b FROM default.diamonds LIMIT 2');
runQuery('SELECT carat as a, color as a FROM default.diamonds LIMIT 2');
