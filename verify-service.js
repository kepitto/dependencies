const path = require('path')
const { Verifier } = require('@pact-foundation/pact')

describe('Pact test for server', () => {
  describe('VerifyServerAgainstCustomer1', () => {
    it('should get the right user data', () => {
      return new Verifier({
        providerBaseUrl: `http://localhost:8080`,
        pactUrls: [path.resolve(__dirname, './pacts/Consumer1-CustomerAPI.json')],
      }).verifyProvider();
    })
  });
  describe('VerifyServerAgainstCustomer2', () => {
    it('should get the right user data', () => {
      return new Verifier({
        providerBaseUrl: `http://localhost:8080`,
        pactUrls: [path.resolve(__dirname, './pacts/Consumer2-CustomerAPI.json')],
      }).verifyProvider();
    })
  });
});