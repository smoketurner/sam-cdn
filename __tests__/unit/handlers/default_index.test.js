const wrapper = require('lambda-wrapper');
const handler = require('../../functions/default_index');

const lambda = wrapper.wrap(handler);

describe('default_index', () => {
  describe('#handler', () => {
    it('rewrites directories to index.html', async () => {
      const event = {
        Records: [
          {
            cf: {
              request: {
                uri: '/test/',
              },
            },
          },
        ],
      };

      const actual = await lambda.run(event);
      expect(actual.uri).toEqual('/index.html');
      expect.assertions(1);
    });

    it('rewrites directories with no slash to index.html', async () => {
      const event = {
        Records: [
          {
            cf: {
              request: {
                uri: '/test',
              },
            },
          },
        ],
      };

      const actual = await lambda.run(event);
      expect(actual.uri).toEqual('/index.html');
      expect.assertions(1);
    });

    it('does not rewrite file requests', async () => {
      const event = {
        Records: [
          {
            cf: {
              request: {
                uri: '/static/img/test.png',
              },
            },
          },
        ],
      };

      const actual = await lambda.run(event);
      expect(actual.uri).toEqual('/static/img/test.png');
      expect.assertions(1);
    });
  });
});
