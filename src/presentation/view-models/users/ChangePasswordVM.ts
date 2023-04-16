import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ChangePasswordModel } from "domain/models/ChangePasswordModel";

export class ChangePasswordVM {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: "Email",
    example: "049494@mail.ru",
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "User password",
    example: "jjjjjj",
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "New password",
    example: "testazazazza",
  })
  newPassword;

  

  static fromViewModel(vm: ChangePasswordVM): ChangePasswordModel {
    return new ChangePasswordModel(vm.email, vm.password, vm.newPassword);
  }
}
