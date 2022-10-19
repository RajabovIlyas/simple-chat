import { Module } from '@nestjs/common';
import { ReadService } from './read.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Read } from './read.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Read])],
  providers: [ReadService],
  exports: [ReadService],
})
export class ReadModule {}
