# csv-exporter

runs as a serverless function on amazon

https://www.npmjs.com/package/serverless

## Deploy

`serverless deploy function --function datasets`

## Test invocation locally

`./node_modules/.bin/sls invoke local -f datasets`


## Deploy and invoke all in one:

```bash
./node_modules/.bin/sls deploy -f datasets && ./node_modules/.bin/sls invoke -f datasets --data '{ "queryStringParameters": {"env":"dev","download": "true"}'
```

## Serving binary files

In order to serve up csv records as a file, we're using a plugin https://www.serverless.com/examples/serverless-binary-files-xlsx 