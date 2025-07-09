import type { HttpContext } from '@adonisjs/core/http';
import ProductService from '../../services/product_service.js';
import ErrorResponse from '../../../../utils/error/error_handler.js';
import logger from '@adonisjs/core/services/logger';
import * as helper from '../../../../utils/helper/helper.js';


const productService = new ProductService();

export default class ProductController {
  async index() {
    try {
      return await productService.all() ?? [];
    } catch (err) {
      logger.error('Error fetching products:', err);
      if (err instanceof ErrorResponse) {
        throw err;
      } else {
        throw new ErrorResponse('Erro interno');
      }
    }
  }

  async store({ request }: HttpContext) {
    try {
      helper.checkRequiredParams(request, ['name', 'amount']);
      const data = request.only(['name', 'amount']);
      return await productService.create(data);
    } catch (err) {
      logger.error('Error creating product:', err);
      if (err instanceof ErrorResponse) {
        throw err;
      } else {
        throw new ErrorResponse('Erro interno')
      }
    }
  }

  async show({ request }: HttpContext) {
    try {
      helper.checkRequiredParams(request, ['id']);
      const { id } = request.only(['id']);
      return await productService.findOrFail(id);
    } catch (err) {
      if (err instanceof ErrorResponse) {
        throw err;
      } else {
        throw new ErrorResponse('Erro interno');
      }
    }
  }

  async update({ request }: HttpContext) {
    try {
      helper.checkRequiredParams(request, ['id']);
      const { id, name, amount } = request.all();
      const updateFields = Object.fromEntries(
        Object.entries({ name, amount }).filter(([_, value]) => value)
      );
      return await productService.update(id, updateFields);
    } catch (err) {
      if (err instanceof ErrorResponse) {
        throw err;
      } else {
        throw new ErrorResponse('Erro interno');
      }
    }
  }

  async destroy({ request }: HttpContext) {
    try {
      const { id } = request.only(['id']);
      return await productService.delete(id);
    } catch (err) {
      if (err instanceof ErrorResponse) {
        throw err;
      } else {
        throw new ErrorResponse('Erro interno');
      }
    }
  }
  
}
