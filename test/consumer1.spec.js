const assert = require('assert')
const { Pact, Matchers } = require('@pact-foundation/pact')
const { getData } = require('../consumer1')
const { eachLike } = Matchers

describe('Pact with Customer API', () => {
  const provider = new Pact({
    port: 8080,
    consumer: 'OrderClient',
    provider: 'OrderApi',
    dir: 'pacts'
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
            items: eachLike({
              id: 1,
              name: 'Hakan',
              address: 'Adresse',
              birthdate: 'xx-xx-xxxx',
              email: 'Email-Adresse',
              status: 'Status',
              products: [ [Object], [Object] ]
                }),
            }),
            status: 200,
        },
      })
    })

    it('will receive the list of all customer', async () => {
      const result = await getData()
      assert.ok(result.length) 
    })
  })
})