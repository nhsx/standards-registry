'use strict';

const config = require('dotenv').config();
const getAllDataSets = require('./get');

module.exports.datasets = async (event, info) => {
  // TODO:
  // * map env to ckanUrl
  const { CKAN_URL, CKAN_API_KEY } = process.env;
  // * default key
  // * pass key hidden?
  // * import get, call, actually export!
  const results = await getAllDataSets(CKAN_URL, CKAN_API_KEY);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        results,
        config,
        env: process.env,
        info,
        message: 'hello Serverless v1.0! Your function executed successfully!',
        event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

// import { getAllDataSets } from '../get';

// module.exports.export = async (event) => {
//   const { queryStringParameters } = event;
//   const { ckanApiKey, ckanUrl } = queryStringParameters;
//   return {
//     statusCode: 200,
//     body: getAllDataSets(ckanUrl, ckanApiKey),
//   };
// };
