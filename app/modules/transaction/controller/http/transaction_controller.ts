import type { HttpContext } from '@adonisjs/core/http';
import TransactionService from '../../services/transaction_service.js';
import { transactionStoreValidator } from '../../validators/transaction_validator.js';
import ErrorResponse from '../../../../utils/error/error_handler.js';
import * as helper from '../../../../utils/helper/helper.js';

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
            helper.checkRequiredParams(request, ['id']);
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

    async store({ request }: HttpContext) {
        try {
            helper.checkRequiredParams(request, ['amount', 'name', 'email', 'cardNumber', 'cvv', 'products']);
            const data = await request.validateUsing(transactionStoreValidator);
            return await transactionService.processPurchase(data, data.products);
        } catch (err: any) {
            console.error('Error creating transaction:', err);
            if (err?.status === 422 && err?.code === 'E_VALIDATION_ERROR') {
                throw new ErrorResponse('Dados inválidos', 422);
            }
            if (err instanceof ErrorResponse) {
                throw err;
            } else {
                throw new ErrorResponse('Erro interno');
            }
        }
    }

}
