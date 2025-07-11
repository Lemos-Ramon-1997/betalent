import TransactionProduct from '#models/transaction_product'
import ErrorResponse from '../../../utils/error/error_handler.js';

export default class TransactionProductRepository {
    async create(data: Partial<TransactionProduct>) {
        try {
        return await TransactionProduct.create(data);
        } catch (err) {
        throw new ErrorResponse('Erro ao criar produto da transação', 500);
        }
    }

    async findByTransaction(transaction_id: number) {
        try {
        return await TransactionProduct.query().where('transaction_id', transaction_id);
        } catch (err) {
        throw new ErrorResponse('Erro ao buscar produtos da transação', 500);
        }
    }

    async createMany(products: Partial<TransactionProduct>[]) {
        try {
            return await TransactionProduct.createMany(products);
        } catch (err) {
            console.error('Erro ao criar múltiplos produtos da transação:', err);
            throw new ErrorResponse('Erro ao criar múltiplos produtos da transação', 500);
        }
    }
}
