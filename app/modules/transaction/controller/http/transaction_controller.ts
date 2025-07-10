import type { HttpContext } from '@adonisjs/core/http';
import TransactionService from '../../services/transaction_service.js';
import ErrorResponse from '../../../../utils/error/error_handler.js';

const transactionService = new TransactionService();

export default class TransactionController {
    async index() {
        try {
            return await transactionService.all();
        } catch (err) {
            if (err instanceof ErrorResponse) {
                throw err;
            } else {
                throw new ErrorResponse('Erro interno');
            }
        }
}

    async show({ request }: HttpContext) {
        try {
            const { id } = request.only(['id']);
            return await transactionService.findById(id);
        } catch (err) {
            if (err instanceof ErrorResponse) {
                throw err;
            } else {
                throw new ErrorResponse('Erro interno');
            }
        }
    }

}
