import { IsOptional, IsString } from 'class-validator';

export class CreateChannelDto {
  @IsOptional()
  @IsString()
  name?: string;
}
