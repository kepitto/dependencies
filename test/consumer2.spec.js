const assert = require('assert')
const { Pact, Matchers } = require('@pact-foundation/pact')
const { getData } = require('../consumer2')
const { eachLike } = Matchers
const path = require('path')

describe('Pact with Customer API', () => {
  const provider = new Pact({
    port: 8080,
    consumer: 'Consumer2',
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
            products: [ {"balance":700,"name":"Staubsauger"}, {"balance":700,"name":"Staubsauger"} ]
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