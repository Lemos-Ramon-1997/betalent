import { BaseSeeder } from '@adonisjs/lucid/seeders';
import Client from '#models/client';
import Gateway from '#models/gateway';

export default class TestDataSeeder extends BaseSeeder {
  public async run() {
    await Client.create({
      name: 'Teste',
      email: 'teste@gmail.com',
    })

    await Gateway.create({
      name: 'Gateway 1',
      is_active: true,
      priority: 1,
    })

    await Gateway.create({
      name: 'Gateway 2',
      is_active: true,
      priority: 2,
    })
  }
}
