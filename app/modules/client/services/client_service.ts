import ClientRepository from '../repositories/client_repository.js';

export default class ClientService {
  protected clientRepository = new ClientRepository();

  async all() {
    try {
      return await this.clientRepository.all();
    } catch (err) {
      throw err;
    }
  }

  async create(data: Partial<any>) {
    try {
      return await this.clientRepository.create(data);
    } catch (err) {
      throw err;
    }
  }

  async findOrFail(id: number) {
    try {
      return await this.clientRepository.findOrFail(id);
    } catch (err) {
      throw err;
    }
  }

  async update(id: number, data: Partial<any>) {
    try {
      return await this.clientRepository.update(id, data);
    } catch (err) {
      throw err;
    }
  }

  async delete(id: number) {
    try {
      return await this.clientRepository.delete(id);
    } catch (err) {
      throw err;
    }
  }
}