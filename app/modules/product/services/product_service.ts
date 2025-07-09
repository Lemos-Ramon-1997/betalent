import ProductRepository from "../repositories/product_repository.js";

export default class ProductService {
  protected productRepository = new ProductRepository();

  async all() {
    try {
      return await this.productRepository.all();
    } catch (err) {
      throw err;
    }
  }

  async create(data: Partial<any>) {
    try {
      return await this.productRepository.create(data);
    } catch (err) {
      throw err;
    }
  }

  async findOrFail(id: number) {
    try {
      return await this.productRepository.findOrFail(id);
    } catch (err) {
      throw err;
    }
  }

  async update(id: number, data: Partial<any>) {
    try {
      return await this.productRepository.update(id, data);
    } catch (err) {
      throw err;
    }
  }

  async delete(id: number) {
    try {
      return await this.productRepository.delete(id);
    } catch (err) {
      throw err;
    }
  }
}