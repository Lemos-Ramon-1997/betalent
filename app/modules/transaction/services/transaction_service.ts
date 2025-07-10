import TransactionRepository from '../repositories/transaction_repository.js';
import ProductRepository from '../../product/repositories/product_repository.js';
import ErrorResponse from '../../../utils/error/error_handler.js';
import axios from 'axios';

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
export default class TransactionService {
    private repository = new TransactionRepository();
    private productRepository = new ProductRepository();

    public async processPurchase(data: CreateTransactionDTO, productsFound: any[]) {
        try {
            const products = await this.productRepository.findAllOrFail(productsFound.map(p => p.product_id));
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

    private async send(data: CreateTransactionDTO) {
        console.log('Dados da transação:', data);
        try {
            try {
                await this.sendRequestOne(data);
            } catch (err) {
                try {
                    console.error('Erro ao enviar requisição para o primeiro serviço, tentando o segundo:');
                    await this.sendRequestSecond(data);
                }catch (err) {
                    throw err;
                }
            }
            return { message: 'Transação processada com sucesso' };
        } catch (err) {
        throw new ErrorResponse('Houve um erro ao processar a transação, entre em contato com o suporte', 500);
        }
    }

    private async sendRequestOne(data: CreateTransactionDTO) {
        try {
            const loginRes = await axios.post('http://localhost:3001/login', {
                email: 'dev@betalent.tech',
                token: 'FEC9BB078BF338F464F96B48089EB498'
            });
            const token = loginRes.data.token; 
            console.log('Token obtido:', token);
            const transactionRes = await axios.post(
                'http://localhost:3001/transactions',
                {
                    amount: data.amount,
                    name: data.name,
                    email: data.email,
                    cardNumber: data.cardNumber,
                    cvv: data.cvv,
                    products: [
                        { product_id: 1, quantity: 2 }
                    ]
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log('Transação criada:', transactionRes.data);
        } catch (err) {
            console.error('Erro ao enviar requisição:', err);
            throw err;
        }
    }

  private async sendRequestSecond() {
    try {
      const loginRes = await axios.post('http://localhost:3333/login', {
        email: 'dev@betalent.tech',
        token: 'FEC9BB078BF338F464F96B48089EB498'
      });
      const token = loginRes.data.token; // ajuste conforme o retorno real

      // 2. Criar uma transação autenticada
      const transactionRes = await axios.post(
        'http://localhost:3333/transactions',
        {
          amount: 1000,
          name: 'tester',
          email: 'tester@email.com',
          cardNumber: '5569000000006063',
          cvv: '010',
          products: [
            { product_id: 1, quantity: 2 }
          ]
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('Transação criada:', transactionRes.data);

      // 3. Listar transações autenticado
      const listRes = await axios.get('http://localhost:3333/transactions', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Transações:', listRes.data);

      return { transaction: transactionRes.data, list: listRes.data };
    } catch (err) {
      throw err;
    }
  }

}
