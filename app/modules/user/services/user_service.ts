import UserRepository from '../repositories/user_repository.js';

export default class UserService {
  protected userRepository = new UserRepository();

  async all() {
    try {
      return await this.userRepository.all();
    } catch (err) {
      throw err;
    }
  }

  async create(data: Partial<any>) {
    try {
      return await this.userRepository.create(data);
    } catch (err) {
      throw err;
    }
  }

  async findOrFail(id: number) {
    try {
      return await this.userRepository.findOrFail(id);
    } catch (err) {
      throw err;
    }
  }

  async update(id: number, data: Partial<any>) {
    try {
      return await this.userRepository.update(id, data);
    } catch (err) {
      throw err;
    }
  }

  async delete(id: number) {
    try {
      return await this.userRepository.delete(id);
    } catch (err) {
      throw err;
    }
  }
}