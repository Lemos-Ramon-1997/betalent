
import GatewayRepository from '../repositories/client_repository.js';


const gatewayRepository = new GatewayRepository();

export default class GatewayService {
  async all() {
    return await gatewayRepository.all();
  }

  async create(data: any) {
    return await gatewayRepository.create(data);
  }

  async findOrFail(id: number) {
    return await gatewayRepository.findOrFail(id);
  }

  async update(id: number, data: any) {
    return await gatewayRepository.update(id, data);
  }

  async delete(id: number) {
    return await gatewayRepository.delete(id);
  }
}
