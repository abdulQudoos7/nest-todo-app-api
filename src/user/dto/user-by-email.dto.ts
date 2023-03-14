import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserByEmailDto {
  @ApiProperty()
  @IsString()
  email: string;
}
