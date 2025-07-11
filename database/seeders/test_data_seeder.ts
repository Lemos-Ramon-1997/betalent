import { BaseSeeder } from '@adonisjs/lucid/seeders';
import Client from '#models/client';
import Gateway from '#models/gateway';
import Product from '#models/product';

export default class TestDataSeeder extends BaseSeeder {
  public async run() {
    await Client.create({
      name: 'Teste',
      email: 'email@email.com',
    })

    await Gateway.createMany([
      { name: 'Gateway 1', is_active: true, priority: 1 },
      { name: 'Gateway 2', is_active: true, priority: 2 }
    ]);

    await Product.createMany([
      { name: 'Tênis', price: 103.00, amount: 10 },
      { name: 'Blusa', price: 54.00, amount: 5 }
    ]);

  }
}
