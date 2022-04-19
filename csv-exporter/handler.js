'use strict';

require('dotenv').config();
const getAllDataSets = require('./get');
const ObjectsToCsv = require('objects-to-csv');

const urls = {
  dev: 'https://manage.dev.nhs.marvell-consulting.com/api/action',
  test: 'https://manage.test.nhs.marvell-consulting.com/api/action',
  prod: 'https://manage.nhs.marvell-consulting.com/api/action',
};

// * choose which env to download from, dev, test, prod
const urlMap = (env) => urls[env] || urls['dev'];

module.exports.datasets = async (event, context) => {
  let help = null;
  const { queryStringParameters } = event;
  const download = queryStringParameters?.download === 'true';
  // * api key passed as key={key}
  const { env, key } = queryStringParameters;
  const ckanUrl = urlMap(env);

  if (!key) {
    help = `CKAN API Key not provided. Will proceed with non-authorised call to the api, which will result in private datasets being hidden.
    The key can be provided in the format ?key={apiKey}`;
  }

  try {
    const { results, count } = await getAllDataSets(ckanUrl, key);
    const csvResult = await new ObjectsToCsv(results).toString();
    const status = { success: true, statusCode: 200, help };
    const response = {
      ...status,
      ...{
        body: JSON.stringify(
          {
            // event,
            // context,
            result: {
              count,
              results,
              csv: [csvResult],
            },
          },
          null,
          2
        ),
      },
    };

    const downloadResponse = {
      ...status,
      ...{
        headers: {
          'Content-Type': 'application/octet-stream',
          'Content-Length': csvResult.length,
          'Content-Disposition': `inline; filename="datasets.test.csv"`,
        },
        isBase64Encoded: true,
        body: Buffer.from(csvResult).toString('base64'),
      },
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
