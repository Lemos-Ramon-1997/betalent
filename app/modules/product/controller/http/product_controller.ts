import type { HttpContext } from '@adonisjs/core/http';
import ProductService from '../../services/product_service.js';
import ErrorResponse from '../../../../utils/error/error_handler.js';
import logger from '@adonisjs/core/services/logger';
import { productStoreValidator, productUpdateValidator } from '../../validators/product_validator.js';
import { translateVineMessages } from '../../../../utils/translate_vine_messages.js';


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
      const data = await request.validateUsing(productStoreValidator);
      return await productService.create(data);
    } catch (err: any) {
      logger.error('Error creating product:', err);
      if (err?.status === 422 && err?.code === 'E_VALIDATION_ERROR') {
        const mensagens = translateVineMessages(err.messages);
        throw new ErrorResponse(mensagens, 422);
      }
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
      const data = await request.validateUsing(productUpdateValidator);
      const { id, ...updateFields } = data;
      return await productService.update(id, updateFields);
    } catch (err: any) {
      if (err?.status === 422 && err?.code === 'E_VALIDATION_ERROR') {
        const mensagens = translateVineMessages(err.messages);
        throw new ErrorResponse(mensagens, 422);
      }
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
