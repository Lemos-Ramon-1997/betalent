import TransactionRepository from '../repositories/transaction_repository.js';
import ProductRepository from '../../product/repositories/product_repository.js';

export default class TransactionService {
  private repository = new TransactionRepository();
  private productRepository = new ProductRepository();

  public async processPurchase(data: any, productsFound: any[]) {
    try {
        await this.productRepository.findAllOrFail(productsFound.map(p => p.product_id));
        
    } catch (err) {
        throw err;
    }
  }

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
