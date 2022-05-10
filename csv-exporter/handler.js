'use strict';

const getAllDataSets = require('./get');
const ObjectsToCsv = require('objects-to-csv');

const urls = {
  dev: 'https://manage.dev.standards.nhs.uk/api/action',
  test: 'https://manage.test.nhs.marvell-consulting.com/api/action',
  prod: 'https://manage.nhs.marvell-consulting.com/api/action',
};

// * choose which env to download from, dev, test, prod
const urlMap = (env) => (env.includes('http') ? env : urls[env] || urls['dev']);

module.exports.datasets = async (event, context) => {
  const help = [];
  const { queryStringParameters } = event;

  // * api key passed as key={key}
  const { env, key = null, download = false } = queryStringParameters;
  const ckanUrl = urlMap(env);

  if (!key) {
    help.push(`CKAN API Key not provided. 
Will proceed with non-authorised call to the api, but private datasets will be hidden.
The key can be provided in the format ?key={apiKey}`);
  }
  if (!env) {
    help.push(`CKAN environment not specified, defaulting to ${ckanUrl}.`);
  }
  if (!download) {
    help.push(`Set download=true to return a downloadable csv.`);
  }

  try {
    const { results, count } = await getAllDataSets(ckanUrl, key);
    const csvResult = await new ObjectsToCsv(results).toString();
    const response = {
      statusCode: 200,
      body: JSON.stringify(
        {
          help: help.join('\n\n'),
          success: true,
          result: {
            count,
            results,
            csv: [csvResult],
          },
        },
        null,
        2
      ),
    };

    const downloadResponse = {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Length': csvResult.length,
        'Content-Disposition': `inline; filename="datasets.test.csv"`,
      },
      isBase64Encoded: true,
      body: Buffer.from(csvResult).toString('base64'),
    };

    return (download && downloadResponse) || response;
  } catch (error) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: false,
        error: error.message,
        context,
        event,
      }),
    };
  }
};
