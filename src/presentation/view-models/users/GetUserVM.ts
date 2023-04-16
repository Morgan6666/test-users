import { ApiProperty } from '@nestjs/swagger';
import { plainToClass, Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

import { GetUserModel } from 'domain/models/GetUserModel';

export class GetUserVM {
  @IsString()
  @IsEmail()
  @ApiProperty({
    description: 'User email',
    example: 'test@mail.ru',
  })
  email: string;

  static fromViewModel(vm: GetUserVM): GetUserModel {
    return new GetUserModel(vm.email);
  }
}
