import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // lưu user (insert hoặc update tùy id)
  async saveUser(user: User): Promise<User> {
    const existingUser = user.username
      ? await this.userRepository.findOne({ where: { username: user.username } })
      : null;

    // 🔐 Chỉ hash nếu là user mới hoặc password bị thay đổi
    if (!existingUser || user.password !== existingUser.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }

    return await this.userRepository.save(user);
  }

  // lấy toàn bộ user
  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // kiểm tra tồn tại username
  async existsByUsername(username: string): Promise<boolean> {
    const count = await this.userRepository.count({ where: { username } });
    return count > 0;
  }

  // tìm user theo username
  async findByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { username } });
  }

  // cập nhật vàng và ngọc
  async updateVangNgoc(username: string, vang: number, ngoc: number): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      return null;
    }
    user.vang = vang;
    user.ngoc = ngoc;
    return await this.userRepository.save(user);
  }

  // top 10 sức mạnh
  async getTop10UsersBySucManh(): Promise<User[]> {
    return await this.userRepository.find({
      order: { sucManh: 'DESC' },
      take: 10,
    });
  }

  // top 10 vàng
  async getTop10UsersByVang(): Promise<User[]> {
    return await this.userRepository.find({
      order: { vang: 'DESC' },
      take: 10,
    });
  }
}