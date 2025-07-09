import User from '#models/user';
import ErrorResponse from '../../../utils/error/error_handler.js';

export default class UserRepository {
  async all() {
    try {
      return await User.all() ?? [];
    } catch (err) {
      throw err;
    }
  }

  async findOrFail(id: number) {
    try {
      const user = await User.find(id);
      if (!user) {
        throw new ErrorResponse('Usuário não encontrado', 404);
      }
      return user;
    } catch (err) {
      throw err;
    }
  }

  async create(data: Partial<User>) {
    try {
      return await User.create(data);
    } catch (err) {
      throw new ErrorResponse('Erro ao criar usuário', 500);
    }
  }

  async update(id: number, data: Partial<User>) {
    try {
      const user = await this.findOrFail(id);
      user.merge(data);
      await user.save();
      return user;
    } catch (err) {
      throw err;
    }
  }

  async delete(id: number) {
    try {
      const user = await this.findOrFail(id);
      await user.delete();
      return { message: 'Usuário removido com sucesso' };
    } catch (err) {
      throw err;
    }
  }
}
