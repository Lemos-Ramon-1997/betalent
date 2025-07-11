import axios from 'axios';
import GatewayRepository from '../repositories/gateway_repository.js';

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

const gatewayRepository = new GatewayRepository();

export default class GatewayService {
  async all() {
    try {
      return await gatewayRepository.all();
    } catch (err) {
      throw err;
    }
  }

  async create(data: any) {
    try {
      return await gatewayRepository.create(data);
    } catch (err) {
      throw err;
    }
  }

  async findOrFail(id: number) {
    try {
      return await gatewayRepository.findOrFail(id);
    } catch (err) {
      throw err;
    }
  }

  async update(id: number, data: any) {
    try {
      return await gatewayRepository.update(id, data);
    } catch (err) {
      throw err;
    }
  }

  async delete(id: number) {
    try {
      return await gatewayRepository.delete(id);
     } catch (err) {
      throw err;
     }
  }

  async gateway_1(data: CreateTransactionDTO) {
    try {
      const GATEWAY1_URL = process.env.GATEWAY1_URL;
      const GATEWAY1_LOGIN = process.env.GATEWAY1_LOGIN;
      const GATEWAY1_TRANSACTIONS = process.env.GATEWAY1_TRANSACTIONS;
      const GATEWAY1_EMAIL = process.env.GATEWAY1_EMAIL;
      const GATEWAY1_TOKEN = process.env.GATEWAY1_TOKEN;
      const loginRes = await axios.post(`${GATEWAY1_URL}${GATEWAY1_LOGIN}`, {
        email: GATEWAY1_EMAIL,
        token: GATEWAY1_TOKEN
      });
      const token = loginRes.data.token;
      const transactionRes = await axios.post(
        `${GATEWAY1_URL}${GATEWAY1_TRANSACTIONS}`,
        {
          amount: data.amount,
          name: data.name,
          email: data.email,
          cardNumber: data.cardNumber,
          cvv: data.cvv,
          products: data.products
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (!transactionRes?.data?.id) {
        throw new Error('Falha ao criar transação no gateway 1');
      }
      return transactionRes.data;
    } catch (err) {
      throw err;
    }
  }

  async gateway_2(data: CreateTransactionDTO) {
    try {
      const GATEWAY2_URL = process.env.GATEWAY2_URL;
      const GATEWAY2_TRANSACTIONS = process.env.GATEWAY2_TRANSACTIONS ;
      const GATEWAY2_TOKEN = process.env.GATEWAY2_TOKEN;
      const GATEWAY2_SECRET = process.env.GATEWAY2_SECRET;
      const headers = {
          'Gateway-Auth-Token': GATEWAY2_TOKEN,
          'Gateway-Auth-Secret': GATEWAY2_SECRET,
      };
      const transactionRes = await axios.post(
        `${GATEWAY2_URL}${GATEWAY2_TRANSACTIONS}`,
        {
            valor: data.amount,
            nome: data.name,
            email: data.email,
            numeroCartao: data.cardNumber,
            cvv: data.cvv,
        },
        { headers }
      );
      if (!transactionRes?.data?.id) {
        throw new Error('Falha ao criar transação no gateway 2');
      }
      return transactionRes.data;
    } catch (err) {
      throw err;
    }
  }
}
