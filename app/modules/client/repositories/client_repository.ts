import Client from '#models/client';
import ErrorResponse from '../../../utils/error/error_handler.js';

export default class ClientRepository {
  async all() {
    try {
      return await Client.all() ?? [];
    } catch (err) {
      throw err;
    }
  }

  async findOrFail(id: number) {
    try {
      const client = await Client.query()
        .where('id', id)
        .preload('transactions')
        .first();
      if (!client) {
        throw new ErrorResponse('Cliente não encontrado', 404);
      }
      return client;
    } catch (err) {
      throw err;
    }
  }

  async findByEmail(email: string) {
    try {
      const client = await Client.query().where('email', email).first();
      if (!client) {
        throw new ErrorResponse('Cliente não encontrado', 404);
      }
      return client;
    } catch (err) {
      throw err;
    }
  }

  async create(data: Partial<Client>) {
    try {
      return await Client.create(data);
    } catch (err) {
      throw new ErrorResponse('Erro ao criar cliente', 500);
    }
  }

  async update(id: number, data: Partial<Client>) {
    try {
      const client = await this.findOrFail(id);
      client.merge(data);
      await client.save();
      return client;
    } catch (err) {
      throw err;
    }
  }

  async delete(id: number) {
    try {
      const client = await this.findOrFail(id);
      await client.delete();
      return { message: 'Cliente removido com sucesso' };
    } catch (err) {
      throw err;
    }
  }
}
