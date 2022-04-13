'use strict';

require('dotenv').config();
const getAllDataSets = require('./get');
const ObjectsToCsv = require('objects-to-csv');
const fs = require('fs');
// Save to file:
// await csv.toDisk(`./${fileToSave}`);

module.exports.datasets = async (event, info) => {
  // TODO:
  // * choose which env to download from
  // * allow api key to be passed in
  // * default key override

  const { queryStringParameters } = event;
  const download = queryStringParameters?.download === 'true';
  const { CKAN_URL, CKAN_API_KEY } = process.env;
  const { results, count } = await getAllDataSets(CKAN_URL, CKAN_API_KEY);

  const response = {
    statusCode: 200,
    body: JSON.stringify(
      {
        event,
        info,
        result: {
          count,
          results,
          csv: [await new ObjectsToCsv(results).toString()],
        },
      },
      null,
      2
    ),
  };

  // const filePath = '/tmp/datasets.csv';
  // await new ObjectsToCsv(results).toDisk(filePath);
  const asString = await new ObjectsToCsv(results).toString();

  const downloadResponse = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/octet-stream',
      // 'Content-Length': fs.statSync(filePath).size,
      'Content-Length': asString.length,
      'Content-Disposition': `inline; filename="datasets.test.csv"`,
    },
    isBase64Encoded: true,
    body: Buffer.from(asString).toString('base64'),
  };

  return (download && downloadResponse) || response;
};
