import TransactionProductRepository from '../repositories/transaction_product_repository.js';

const repository = new TransactionProductRepository();

export default class TransactionProductService {


  async create(data: any) {
    try {
      return await repository.create(data);
    } catch (err) {
      throw err;
    }
  }

  async findByTransaction(transaction_id: number) {
    try {
      return await repository.findByTransaction(transaction_id);
    } catch (err) {
      throw err;
    }
  }
}
