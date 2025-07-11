import Transaction from '#models/transaction';
import ErrorResponse from '../../../utils/error/error_handler.js';

export default class TransactionRepository {
  async create(data: Partial<Transaction>) {
    try {
      return await Transaction.create(data);
    } catch (err) {
      throw new ErrorResponse('Erro ao criar transação', 500);
    }
  }

  async findById(id: number) {
    try {
      return await Transaction.find(id);
    } catch (err) {
      throw new ErrorResponse('Erro ao buscar transação', 500);
    }
  }

  async all() {
    try {
      return await Transaction.all();
    } catch (err) {
      throw new ErrorResponse('Erro ao listar transações', 500);
    }
  }
}
