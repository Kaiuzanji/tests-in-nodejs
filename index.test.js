import assert from 'assert'
import Product from './product.js'
import Service from './service.js'

const callTracker = new assert.CallTracker()
// Quando o programa terminar, valida todas as chamadas
process.on('exit',() =>  callTracker.verify())
// Should throw an error when description is less than 5 characters long
{
  const params = { 
    description: 'myP', 
    id: 1, 
    price: 1000
  }

  const product = new Product({
    onCreate: () => {},
    service: new Service()
  })

  assert.rejects(
    () => product.create(params),
    { message: 'description must be higher than 5' },
    'it should throw an error with wrong description '
  )
}
// Should save product successfully
{
  // MOCK => O que precisamos para o teste funcionar 
  const params = { 
    description: 'my Product', 
    id: 1, 
    price: 1000
  }
  // serviceStub => impedir que seja online
  const spySave = callTracker.calls(1)
  const serviceStub = {
    async save(params){
      // spy => espiona a função
      spySave(params)
      return `${params.id} saved with success!`
    }
  }
  // OnCreate
  const spyOnCreateValidations = (msg) => {
    assert.deepStrictEqual(msg.id, params.id, 'id should be the same')
    assert.deepStrictEqual(msg.price, params.price, 'price should be the same')
    assert.deepStrictEqual(msg.description, params.description, 'description should be the same')
  }

  const spyOnCreate = callTracker.calls(spyOnCreateValidations, 1)

  const onCreate = (msg) => {
    spyOnCreate(msg)
  }

  // Instance Test
  const product = new Product({
    onCreate: onCreate,
    service: serviceStub 
  })

  const result = await product.create(params)
}