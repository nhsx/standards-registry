'use strict';

module.exports.datasets = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'hello Serverless v1.0! Your function executed successfully!',
        input: event,
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
