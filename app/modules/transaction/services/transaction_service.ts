import TransactionRepository from '../repositories/transaction_repository.js';
import ProductRepository from '../../product/repositories/product_repository.js';
import ErrorResponse from '../../../utils/error/error_handler.js';
import axios from 'axios';
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

    private async send(data: any) {
        try {
            try {
                await this.sendRequestOne();
            } catch (err) {
                try {
                    await this.sendRequestSecond();
                }catch (err) {
                    throw err;
                }
            }
        } catch (err) {
        throw new ErrorResponse('Houve um erro ao processar a transação, entre em contato com o suporte', 500);
        }
    }

    private async sendRequestOne() {
        try {
            const loginRes = await axios.post('http://localhost:3001/login', {
                email: 'dev@betalent.tech',
                token: 'FEC9BB078BF338F464F96B48089EB498'
            });
            const token = loginRes.data.token; 
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
            return { transaction: transactionRes.data, message: 'Transação efetuada com sucesso' };
        } catch (err) {
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
