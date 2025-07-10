import TransactionProduct from 'App/models/transaction_product.js'

export default class TransactionProductService {
  public async create(data: Partial<TransactionProduct>) {
    return TransactionProduct.create(data)
  }

  public async findByTransaction(transaction_id: number) {
    return TransactionProduct.query().where('transaction_id', transaction_id)
  }
}
