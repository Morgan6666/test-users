import {
  Controller,
  Post,
  Body,
  Req,
  Patch,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiUnprocessableEntityResponse,
  ApiBadRequestResponse,
  ApiResponse,
} from '@nestjs/swagger';

import { UsersUseCases } from 'application/use-cases/UsersUseCases';
import { CreateUserVM } from 'presentation/view-models/users/CreateUserVM';
import { UserVM } from 'presentation/view-models/users/UserVM';
import { BadRequestError } from 'presentation/errors/BadRequestError';
import { UnprocessableEntityError } from 'presentation/errors/UnprocessableEntityError';

import { UserLoginVM } from 'presentation/view-models/users/UserLoginVM';
import { GetUserVM } from 'presentation/view-models/users/GetUserVM';

import { ChangePasswordVM } from 'presentation/view-models/users/ChangePasswordVM';
import { posixSync } from 'rimraf';

import { Request } from 'express';
import { JwtTokenModel } from 'domain/models/JwtToken';
const requestIp = require('request-ip');

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersUseCases: UsersUseCases) {}

  @Post('sign')
  @ApiOperation({
    summary: 'Sign User',
  })
  @ApiResponse({ description: 'User successfull sign', type: UserVM })
  @ApiBadRequestResponse({
    description: 'The request object doesn`t match the expected one',
    type: BadRequestError,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Validation errro while sign user',
    type: UnprocessableEntityError,
  })
  async sign(@Body() createUser: CreateUserVM, @Req() request: Request) {
    const useragent = request.headers['user-agent'];
    const newUser = await this.usersUseCases.sign(
      CreateUserVM.fromViewModel(createUser),
      useragent,
    );
    return newUser;
  }

  @Post('login')
  @ApiOperation({
    summary: 'Login User',
  })
  @ApiResponse({ description: 'User successfull login', type: UserLoginVM })
  @ApiBadRequestResponse({
    description: 'The request object doesnt th expected one',
    type: BadRequestError,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Validation error while login user',
    type: UnprocessableEntityError,
  })
  async login(@Body() loginUser: UserLoginVM) {
    const userLogin = await this.usersUseCases.login(
      UserLoginVM.fromViewModel(loginUser),
    );
    return userLogin;
  }

  @Post('info')
  @ApiOperation({
    summary: 'User info',
  })
  @ApiResponse({ description: 'User successfully', type: GetUserVM })
  @ApiBadRequestResponse({
    description: 'The request object doesnt th expected one',
    type: BadRequestError,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Validation error while login user',
    type: UnprocessableEntityError,
  })
  async userInfo(@Body() userInfo: GetUserVM) {
    const info = await this.usersUseCases.getUserByEmai(
      GetUserVM.fromViewModel(userInfo),
    );
    return info;
  }

  @Patch('logout')
  async logout(@Req() request: Request) {
    const useragent = request.headers['user-agent'];
    const result = await this.usersUseCases.logout(useragent);
    return result;
  }
  

  @Post('change')
  @ApiOperation({
    summary: 'Change password',
  })
  
  @ApiBadRequestResponse({
    description: 'The request object doesnt th expected one',
    type: BadRequestError,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Validation error while email user',
    type: UnprocessableEntityError,
  })
  async changePassword(@Body() userInfo: ChangePasswordVM) {
    const result = await this.usersUseCases.changePassword(
      ChangePasswordVM.fromViewModel(userInfo),
    );
    return result;
  }
  
  

  @Patch('refresh')
  async refresToken(@Req() request: Request) {
    const token = request.headers['access-token'].toString();
    const result = await this.usersUseCases.updateAccessToken(token);
    return result;
  }

  @Post('user_id')
  async getUserIdByEmail(@Body() data: GetUserVM) {
    const result = await this.usersUseCases.getUserIdByEmail(
      GetUserVM.fromViewModel(data),
    );
    return result;
  }

}
