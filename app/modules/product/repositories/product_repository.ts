import Product from '#models/product';
import ErrorResponse from '../../../utils/error/error_handler.js';

export default class ProductRepository {
  async findAllOrFail(ids: number[]) {
    try {
      const products = await Product.query().whereIn('id', ids);
      if (Array.isArray(products) && products.length !== ids.length) {
        throw new ErrorResponse('Um ou mais produtos não foram encontrados', 404);
      } 
      return products;
    } catch (err) {
      throw err;
    }
  }

  async all() {
    try {
      return await Product.all() ?? [];
    } catch (err) {
      throw err;
    }
  }

  async findOrFail(id: number) {
    try {
      const product = await Product.find(id);
      if (!product) {
        throw new ErrorResponse('Produto não encontrado', 404);
      }
      return product;
    } catch (err) {
      throw err;
    }
  }

  async create(data: Partial<Product>) {
    try {
      return await Product.create(data);
    } catch (err) {
      throw new ErrorResponse('Erro ao criar produto', 500);
    }
  }

  async update(id: number, data: Partial<Product>) {
    try {
      const product = await this.findOrFail(id);
      product.merge(data);
      await product.save();
      return product;
    } catch (err) {
      throw err;
    }
  }

  async delete(id: number) {
    try {
      const product = await this.findOrFail(id);
      await product.delete();
      return { message: 'Produto removido com sucesso' };
    } catch (err) {
      throw err;
    }
  }
}
