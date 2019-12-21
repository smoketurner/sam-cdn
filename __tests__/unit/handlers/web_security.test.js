const wrapper = require('lambda-wrapper');
const handler = require('../../functions/web_security');

const lambda = wrapper.wrap(handler);

describe('web_security', () => {
  describe('#handler', () => {
    it('successfully adds web security headers', async () => {
      const event = {
        Records: [
          {
            cf: {
              response: {
                headers: {},
              },
            },
          },
        ],
      };

      const actual = await lambda.run(event);
      expect(actual.headers['Strict-Transport-Security']).toEqual([
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload',
        },
      ]);
      expect(actual.headers['X-XSS-Protection']).toEqual([
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
      ]);
      expect(actual.headers['X-Content-Type-Options']).toEqual([
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
      ]);
      expect(actual.headers['X-Frame-Options']).toEqual([
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN',
        },
      ]);
      expect(actual.headers['Referrer-Policy']).toEqual([
        {
          key: 'Referrer-Policy',
          value: 'no-referrer-when-downgrade',
        },
      ]);
      expect(actual.headers['Content-Security-Policy']).toEqual([
        {
          key: 'Content-Security-Policy',
          value: 'upgrade-insecure-requests;',
        },
      ]);
      expect(actual.headers['Feature-Policy']).toEqual([
        {
          key: 'Feature-Policy',
          value:
            'geolocation none; midi none; notifications none; push none; sync-xhr none; microphone none; camera none; magnetometer none; gyroscope none; speaker self; vibrate none; fullscreen self; payment none;',
        },
      ]);
      expect.assertions(7);
    });
  });
});
