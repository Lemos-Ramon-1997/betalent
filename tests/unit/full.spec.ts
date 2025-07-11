import { test } from '@japa/runner'
import supertest from 'supertest'

const app = 'http://localhost:3333'

// Helper function para obter token
async function getAuthToken() {
  const login = await supertest(app)
    .post('/auth/login')
    .send({ email: 'email@email.com', password: '12345678' })
  return login.body.token
}

// Auth
test.group('Auth', () => {
  test('login deve retornar token', async ({ assert }) => {
    const response = await supertest(app)
      .post('/auth/login')
      .send({ email: 'email@email.com', password: '12345678' })
      .expect(200)
    assert.exists(response.body.token)
  })
})

// User CRUD
test.group('User CRUD', () => {
  test('criar e deletar usuário', async ({ assert }) => {
    const token = await getAuthToken()

    const response = await supertest(app)
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({ 
        name: 'Novo Usuário', 
        surname: 'Sobrenome', 
        email: 'johnnyramon2011@gmail.com', 
        password: '12345678', 
        role: 'USER' 
      })
      .expect(200)
    assert.exists(response.body.id)

    await supertest(app)
      .post('/users/delete')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: response.body.id })
      .expect(200)
  })

  test('listar usuários', async ({ assert }) => {
    const token = await getAuthToken()

    const response = await supertest(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
    assert.isArray(response.body)
  })

  test('atualizar usuário', async ({ assert }) => {
    const token = await getAuthToken()

    // Primeiro cria o usuário
    const user = await supertest(app)
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({ 
        name: 'Usuário para Atualizar',
        surname: 'Sobrenome',
        email: 'atualizar@teste.com', 
        password: '12345678', 
        role: 'USER' 
      })

    // Depois atualiza
    const response = await supertest(app)
      .post('/users/update')
      .set('Authorization', `Bearer ${token}`)
      .send({ 
        id: user.body.id,
        role: 'MANAGER' 
      })
      .expect(200)
    assert.equal(response.body.role, 'MANAGER')

    // Limpeza
    await supertest(app)
      .post('/users/delete')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: user.body.id })
  })
})

// Product CRUD
test.group('Product CRUD', () => {
  test('criar produto', async ({ assert }) => {
    const token = await getAuthToken()

    const response = await supertest(app)
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Produto Teste', amount: 10, price: 100 })
      .expect(200)
    assert.exists(response.body.id)

    // Limpeza
    await supertest(app)
      .post('/products/delete')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: response.body.id })
  })

  test('listar produtos', async ({ assert }) => {
    const token = await getAuthToken()

    const response = await supertest(app)
      .get('/products')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
    assert.isArray(response.body)
  })

  test('atualizar produto', async ({ assert }) => {
    const token = await getAuthToken()

    // Cria produto
    const product = await supertest(app)
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Produto Atualizar', amount: 5, price: 50 })

    // Atualiza
    const response = await supertest(app)
      .post('/products/update')
      .set('Authorization', `Bearer ${token}`)
      .send({ 
        id: product.body.id,
        amount: 20,
        price: 100
      })
      .expect(200)
    assert.equal(response.body.amount, 20)
    assert.equal(response.body.price, 100)

    // Limpeza
    await supertest(app)
      .post('/products/delete')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: product.body.id })
  })
})

// Client CRUD
test.group('Client CRUD', () => {
  test('criar cliente', async ({ assert }) => {
    const token = await getAuthToken()

    const response = await supertest(app)
      .post('/clients')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Cliente Teste', email: 'cliente@teste.com' })
      .expect(200)
    assert.exists(response.body.id)

    // Limpeza
    await supertest(app)
      .post('/clients/delete')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: response.body.id })
  })

  test('listar clientes', async ({ assert }) => {
    const token = await getAuthToken()

    const response = await supertest(app)
      .get('/clients')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
    assert.isArray(response.body)
  })

  test('detalhar cliente', async ({ assert }) => {
    const token = await getAuthToken()

    // Cria cliente
    const client = await supertest(app)
      .post('/clients')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Cliente Detalhe', email: 'detalhe@teste.com' })

    // Detalha
    const response = await supertest(app)
      .post('/clients/show')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: client.body.id })
      .expect(200)
    assert.equal(response.body.email, 'detalhe@teste.com')

    // // Limpeza
    await supertest(app)
      .post('/clients/delete')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: client.body.id })
  })
})

// Gateway CRUD
test.group('Gateway CRUD', () => {
  test('criar gateway', async ({ assert }) => {
    const token = await getAuthToken()

    const response = await supertest(app)
      .post('/gateways')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Gateway Teste', is_active: true, priority: 1 })
      .expect(200)
    assert.exists(response.body.id)

    // Limpeza
    await supertest(app)
      .post('/gateways/delete')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: response.body.id })
  })

  test('listar gateways', async ({ assert }) => {
    const token = await getAuthToken()

    const response = await supertest(app)
      .get('/gateways')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
    assert.isArray(response.body)
  })

  test('atualizar prioridade do gateway', async ({ assert }) => {
    const token = await getAuthToken()

    // Cria gateway
    const gateway = await supertest(app)
      .post('/gateways')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Gateway Prioridade', is_active: true, priority: 2 })

    // Atualiza prioridade
    const response = await supertest(app)
      .post('/gateways/update')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: gateway.body.id, priority: 1 })
      .expect(200)
    assert.equal(response.body.priority, 1)

    // Limpeza
     await supertest(app)
      .post('/gateways/delete')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: gateway.body.id })
  })

  test('ativar/desativar gateway', async ({ assert }) => {
    const token = await getAuthToken()

    // Cria gateway
    const gateway = await supertest(app)
      .post('/gateways')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Gateway Ativar', is_active: false, priority: 3 })

    // Ativa
    const response = await supertest(app)
      .post('/gateways/update')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: gateway.body.id, is_active: true })
      .expect(200)
    assert.equal(response.body.isActive, true)

    // Limpeza
    await supertest(app)
      .post('/gateways/delete')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: gateway.body.id })
  })
})

// Transaction
test.group('Transaction', () => {
  test('listar todas as compras', async ({ assert }) => {
    const token = await getAuthToken()

    const response = await supertest(app)
      .get('/transactions')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
    assert.isArray(response.body)
  })

  test('detalhar compra', async ({ assert }) => {
    const token = await getAuthToken()

    // Cria uma compra de teste
    const compra = await supertest(app)
      .post('/transactions/store')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Cliente Teste',
        email: 'email@email.com',
        cardNumber: '5569000000006063',
        cvv: '010',
        products: [
          { product_id: 1, quantity: 1 }
        ]
      })
      .expect(200)

    // Detalha a compra
    const response = await supertest(app)
      .post('/transactions/show')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: compra.body.transaction_id })
      .expect(200)
    assert.exists(response.body.id)
  })
})

// Compra e Reembolso
test.group('Compra e Reembolso', () => {
  test('deve realizar compra e reembolso', async ({ assert }) => {
    const token = await getAuthToken()

    // Realiza compra
    const compra = await supertest(app)
      .post('/transactions/store')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Cliente Teste',
        email: 'email@email.com',
        cardNumber: '5569000000006063',
        cvv: '010',
        products: [
          { product_id: 1, quantity: 1 }
        ]
      })
      .expect(200)

    const transactionId = compra.body.transaction_id

    // Realiza reembolso
    const response = await supertest(app)
      .post('/transactions/refund')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: transactionId })
      .expect(200)
    assert.equal(response.body.message, 'Reembolso realizado com sucesso')
  })
})