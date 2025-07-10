import TransactionRepository from '../repositories/transaction_repository.js';


export default class TransactionService {
  private repository = new TransactionRepository();

  public async create(data: any) {
    try {
      return await this.repository.create(data);
    } catch (err) {
      throw err;
    }
  }

  public async findById(id: number) {
    try {
      return await this.repository.findById(id);
    } catch (err) {
      throw err;
    }
  }

  public async all() {
    try {
      return await this.repository.all();
    } catch (err) {
      throw err;
    }
  }
}
