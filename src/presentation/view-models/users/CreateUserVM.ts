import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEmail } from "class-validator";

import { User } from "domain/models/User";

export class CreateUserVM {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "The name of the user",
    example: "John Doe",
  })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: "The unique email of the user",
    example: "john.doe@gmail.com",
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Last name of the user",
    example: "Snow",
  })
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "User password",
    example: "kfngjbngjbngjnbgjbg",
  })
  password: string;

  static fromViewModel(vm: CreateUserVM): User {
    return new User(vm.firstName, vm.lastName, vm.email, vm.password);
  }
}
