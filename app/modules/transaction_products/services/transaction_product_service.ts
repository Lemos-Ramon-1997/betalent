import TransactionProductRepository from '../repositories/transaction_product_repository.js';

export default class TransactionProductService {
  private repository = new TransactionProductRepository();

  public async create(data: any) {
    try {
      return await this.repository.create(data);
    } catch (err) {
      throw err;
    }
  }

  public async findByTransaction(transaction_id: number) {
    try {
      return await this.repository.findByTransaction(transaction_id);
    } catch (err) {
      throw err;
    }
  }
}
