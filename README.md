This repo demonstrates a bug where aliasing two columns with the same name
results in the query's result missing data.

For example this query returns the expected data,
```sql
SELECT carat as a, color as b FROM default.diamonds LIMIT 2;

-- Result
┌─────────┬────────┬─────┐
│ (index) │   a    │  b  │
├─────────┼────────┼─────┤
│    0    │ '0.23' │ 'E' │
│    1    │ '0.21' │ 'E' │
└─────────┴────────┴─────┘
```

Whereas this query returns results missing data,
```sql
SELECT carat as a, color as a FROM default.diamonds LIMIT 2;

-- Result
┌─────────┬─────┐
│ (index) │  a  │
├─────────┼─────┤
│    0    │ 'E' │
│    1    │ 'E' │
└─────────┴─────┘
```

## Running this example,
```txt
# Install deps
$ npm install

# Export the necessary configuration/authentication values
$ DATABRICKS_TOKEN=<your Databricks account access token>
$ DATABRICKS_SERVER_HOSTNAME=<your Databricks server host name>
$ DATABRICKS_HTTP_PATH=<your Databricks cluster's http path>

# Run the example showing the bug
$ node main.js
```
