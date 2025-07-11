import TransactionRepository from '../repositories/transaction_repository.js';
import ProductRepository from '../../product/repositories/product_repository.js';
import GatewayRepository from '../../gateway/repositories/gateway_repository.js';
import ErrorResponse from '../../../utils/error/error_handler.js';
import GatewayService from '../../gateway/services/gateway_service.js';
import ClientRepository from '../../client/repositories/client_repository.js';

export interface TransactionProduct {
  product_id: number;
  quantity: number;
}

export interface CreateTransactionDTO {
  amount?: number;
  name: string;
  email: string;
  cardNumber: string;
  cvv: string;
  products: TransactionProduct[];
}

const repository = new TransactionRepository();
const productRepository = new ProductRepository();
const gatewayRepository = new GatewayRepository();
const gatewayService = new GatewayService();
export default class TransactionService {
    async processPurchase(data: CreateTransactionDTO, productsFound: any[]) {
        try {
            const products = await productRepository.findAllOrFail(productsFound.map(p => p.product_id));
            const client = await 
            for (const product of products) {
                const productData = productsFound.find(p => p.product_id === product.id);
                if (productData && productData.quantity > product.amount) {
                    throw new ErrorResponse(`Estoque insuficiente para o produto '${product.name}'. Disponível: ${product.amount}, solicitado: ${productData.quantity}`, 422);
                }
            }
            const totalAmount = products.reduce((total, product) => {
                const productData = productsFound.find(p => p.product_id === product.id);
                return total + (productData?.quantity || 0) * product.price;
            }, 0);
            data.amount = totalAmount ?? 0;
            return await this.send(data);
        } catch (err) {
            throw err;
        }
    }

    private async create(data: any) {
        try {
            return await repository.create(data);
        } catch (err) {
            throw err;
        }
    }

    async findById(id: number) {
        try {
        return await repository.findById(id);
        } catch (err) {
        throw err;
        }
    }

    async all() {
        try {
            return await repository.all();
        } catch (err) {
            throw err;
        }
    }

    private async send(data: CreateTransactionDTO) {
        const gateways = await gatewayRepository.getActiveOrdered();
        const handlers: Record<string, (data: CreateTransactionDTO) => Promise<any>> = {
            'gateway 1': gatewayService.gateway_1,
            'gateway 2': gatewayService.gateway_2,
        };
        let lastError = null;
        for (const gateway of gateways) {
            const handler = handlers[gateway.name.trim().toLowerCase()];
            if (!handler) continue;
            try {
                // Executa o handler do gateway e espera resposta
                const gatewayResult = await handler(data);
                // Supondo que o handler retorne o external_id ou id do gateway
                // Cria a transação local
                const transaction = await repository.create({
                    client: ,
                    gateway: gateway.id,
                    external_id: gatewayResult?.id?? null,
                    status: 'aprovado',
                    amount: data.amount,
                    card_last_numbers: data.cardNumber?.slice(-4) ?? null,
                });
                // Cria os produtos da transação
                for (const prod of data.products) {
                    await import('../../../models/transaction_product.js').then(({ default: TransactionProduct }) => {
                        return TransactionProduct.create({
                            transaction_id: transaction.id,
                            product_id: prod.product_id,
                            quantity: prod.quantity,
                        });
                    });
                }
                return { message: `Transação processada com sucesso pelo ${gateway.name}`, transaction_id: transaction.id };
            } catch (err) {
                lastError = err;
            }
        }
        console.error('Erro ao processar transação:', lastError);
        throw new ErrorResponse('Houve um erro ao processar a transação em todos os gateways, entre em contato com o suporte', 500);
    }

    

}
