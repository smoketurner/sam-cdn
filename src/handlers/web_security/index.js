/**
 * Lambda@Edge Origin Response Handler
 *
 * @param {Object} event
 * @param {Object} context
 * @return {Promise}
 * @see https://medium.com/faun/hardening-the-http-security-headers-with-aws-lambda-edge-and-cloudfront-2e2da1ae4d83
 */
exports.handler = async (event, context) => {
  const { response } = event.Records[0].cf;
  const { headers = {} } = response;

  headers['Strict-Transport-Security'] = [
    {
      key: 'Strict-Transport-Security',
      value: 'max-age=63072000; includeSubDomains; preload',
    },
  ];

  headers['X-XSS-Protection'] = [
    {
      key: 'X-XSS-Protection',
      value: '1; mode=block',
    },
  ];

  headers['X-Content-Type-Options'] = [
    {
      key: 'X-Content-Type-Options',
      value: 'nosniff',
    },
  ];

  headers['X-Frame-Options'] = [
    {
      key: 'X-Frame-Options',
      value: 'SAMEORIGIN',
    },
  ];

  headers['Referrer-Policy'] = [
    {
      key: 'Referrer-Policy',
      value: 'no-referrer-when-downgrade',
    },
  ];

  headers['Content-Security-Policy'] = [
    {
      key: 'Content-Security-Policy',
      value: 'upgrade-insecure-requests;',
    },
  ];

  headers['Feature-Policy'] = [
    {
      key: 'Feature-Policy',
      value:
        'geolocation none; midi none; notifications none; push none; sync-xhr none; microphone none; camera none; magnetometer none; gyroscope none; speaker self; vibrate none; fullscreen self; payment none;',
    },
  ];

  return response;
};
