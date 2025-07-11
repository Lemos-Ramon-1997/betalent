import Gateway from '#models/gateway';
import ErrorResponse from '../../../utils/error/error_handler.js';

export default class GatewayRepository {
  async all() {
    try {
        return await Gateway.all() ?? [];
    } catch (err) {
        throw err;
    }
  }

  async create(data: Partial<Gateway>) {
    try {
      return await Gateway.create(data);
    } catch (err) {
      throw new ErrorResponse('Erro ao criar gateway', 500);
    }
  }

  async findOrFail(id: number) {
    try {
        const gateway = await Gateway.find(id);
        if (!gateway) {
            throw new ErrorResponse('Gateway não encontrado', 404);
        }
        return gateway;
    } catch (err) {
        throw err;
    }
  }

  async update(id: number, data: Partial<Gateway>) {
    try {
        const gateway = await this.findOrFail(id);
        gateway.merge(data);
        await gateway.save();
        return gateway;
    } catch (err) {
        throw err;
    }
  }

  async delete(id: number) {
    try {
        const gateway = await this.findOrFail(id);
        await gateway.delete();
        return { message: 'Gateway removido com sucesso' };
    } catch (err) {
        throw err;
    }
  }

  async getActiveOrdered() {
    try {
      return await Gateway.query().where('is_active', true).orderBy('priority', 'asc');
    } catch (err) {
      throw new ErrorResponse('Erro ao buscar gateways ativos', 500);
    }
  }
}
