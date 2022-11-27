const assert = require('assert')
const { Pact, Matchers } = require('@pact-foundation/pact')
const { getData } = require('../consumer1')
const { afterEach } = require('mocha')
const { eachLike } = Matchers
const path = require('path')

describe('Pact with Customer API', () => {
  const provider = new Pact({
    port: 8080,
    consumer: 'Consumer1',
    provider: 'CustomerAPI',
    dir: path.resolve(process.cwd(), "pacts")
  })

  before(() => provider.setup())

  after(() => provider.finalize())

  describe('when a call to the API is made', () => {
    before(async () => {
      return provider.addInteraction({
        state: 'there are customer',
        uponReceiving: 'a request for customer',
        withRequest: {
          path: '/getCustomerData',
          method: 'GET',
        },
        willRespondWith: {
          body: eachLike({
              id: 1,
              name: 'Hakan',
              email: 'Email-Adresse',
              status: 'Status'
            }),
            status: 200,
        },
      })
    })

    it('will receive the list of all customer', async () => {
      const result = await getData()
      assert.ok(result.length) 
    })
    afterEach(() => provider.verify());
    after(() => provider.finalize());
  })
})