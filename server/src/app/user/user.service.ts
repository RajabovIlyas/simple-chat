import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(user: Omit<User, 'id'>) {
    return this.userRepository.save(user);
  }

  findOne(params: Partial<User>) {
    return this.userRepository.findOne({ where: params, relations: ['file'] });
  }
}
