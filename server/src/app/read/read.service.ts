import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Read } from './read.entity';

@Injectable()
export class ReadService {
  constructor(
    @InjectRepository(Read)
    private ReadRepository: Repository<Read>,
  ) {}

  create(read: Omit<Read, 'id' | 'message' | 'user'>) {
    return this.ReadRepository.save(read);
  }

  findOne(params: Partial<Read>) {
    return this.ReadRepository.findOne({ where: params, relations: ['file'] });
  }

  async findOrCreate(data: Omit<Read, 'id' | 'message' | 'user'>) {
    const read = await this.ReadRepository.findOne({ where: data });
    if (read) {
      return read;
    }
    return this.create(data);
  }
}
