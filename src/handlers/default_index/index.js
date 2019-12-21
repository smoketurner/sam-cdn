const path = require('path');

/**
 * Lambda@Edge Origin Request Handler
 *
 * @param {Object} event
 * @param {Object} context
 * @return {Promise}
 * @see https://www.awsadvent.com/2018/12/03/vanquishing-cors-with-cloudfront-and-lambdaedge/
 */
exports.handler = async (event, context) => {
  const { request } = event.Records[0].cf;

  // If the request URI does not include a file extension, re-route to index.html
  if (!path.extname(request.uri)) {
    request.uri = '/index.html';
  }

  return request;
};
