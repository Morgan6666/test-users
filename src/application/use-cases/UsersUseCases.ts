import { Injectable, Logger } from '@nestjs/common';

import { IUsersRepository } from 'application/ports/IUsersRepository';
import { UserExceptions } from 'domain/exceptions/UserExceptions';
import { ChangePasswordModel } from 'domain/models/ChangePasswordModel';
import { GetUserModel } from 'domain/models/GetUserModel';
import { Login } from 'domain/models/Login';
import { User } from 'domain/models/User';
import { ServiceResponse } from 'infrastructure/utils/serviceResponse';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { salt } from 'infrastructure/utils/secretsConstant';
import { ConfigService } from '@nestjs/config';
import { JwtTokenModel } from 'domain/models/JwtToken';
import Redis from 'ioredis';
import { InjectRedis, RedisModule } from '@liaoliaots/nestjs-redis';
import { TServiceRes, TServiceResWithoutContent } from 'infrastructure/types/TServiceRes';
import { TTokens } from 'infrastructure/types/TTokens';

@Injectable()
export class UsersUseCases {
  private readonly logger = new Logger(UsersUseCases.name);
  public userException = new UserExceptions();
  public serviceRes = new ServiceResponse();
  private configService: ConfigService;
  constructor(
    private readonly usersRepository: IUsersRepository,
    private jwtService: JwtService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

 
  async calculateTokens(user: JwtTokenModel): Promise<TTokens> {
    const access_token: string = await this.jwtService.signAsync(user, {
      expiresIn: '15m',
    });
    const refresh_token: string = await this.jwtService.signAsync(user, {
      expiresIn: '7d',
    });
    return { access_token, refresh_token };
  }

  async sign(user: User, user_agent: string): Promise<TServiceRes | TServiceResWithoutContent> {
    const checkUser = await this.usersRepository.getUser(user);
    this.logger.log(`Check if user exiss:${checkUser}`);
    if (!checkUser) {
      this.logger.log(`Create new user:${user.email}`);
      let encrPassword = await bcrypt.hash(user.password, salt);
      user.password = encrPassword;
      const result = await this.usersRepository.signUser(user);
      const tokens = await this.calculateTokens(result);
      const red = await this.redis.set(user_agent, tokens.refresh_token);
      return this.serviceRes.uniqueSuccessRes(tokens);
    } else {
      this.logger.log(`user already exists:${user.email}`);
      return this.serviceRes.userAlreadyExist();
    }
  }

  async login(user: Login): Promise<TServiceRes | TServiceResWithoutContent> {
    const checkUser = await this.usersRepository.getUser(user);
    if (!checkUser) {
      this.logger.warn(`Пользователь не найден:${user.email}`);
      return this.serviceRes.userNotFound();
    } else {
      const isMatch: boolean = await bcrypt.compare(user.password, checkUser.password);
      if (isMatch) {
        this.logger.log(`Пользователь ${user.email} вошёл в систему`);
        const tokens = await this.calculateTokens(checkUser);
        return this.serviceRes.uniqueSuccessRes(tokens);
      } else {
        this.logger.log('Пароли не совпадают');
        return this.serviceRes.passwordMismatch();
      }
    }
  }
 

  async logout(user_agent: string): Promise<TServiceRes | TServiceResWithoutContent> {
    this.logger.log('Проверяем наличие сессии пользователя в redis');
    const checkTokenRedis = await this.redis.get(user_agent);
    if (checkTokenRedis) {
      this.logger.log('Удаляем сессию пользователя');
      const delSession = await this.redis.del(user_agent);
      return this.serviceRes.usersSessionSuccessDelete();
    } else {
      this.logger.log('Сессия пользователя не существует');
      return this.serviceRes.userSessionNotFound();
    }
  }

 

  async getUserByEmai(user: GetUserModel): Promise<TServiceRes | TServiceResWithoutContent> {
    this.logger.log('GetUser by email');
    const result = await this.usersRepository.getUserByEmail(user);
    if (!result) {
      this.logger.warn(`Пользователь не найден:${result}`);
      return this.serviceRes.userNotFound();
    } else {
      this.logger.log(`Пользователь:${user.email}`);
      return this.serviceRes.uniqueSuccessRes(result);
    }
  }

  async changePassword(user: ChangePasswordModel): Promise<TServiceRes | TServiceResWithoutContent> {
    const checkUser = await this.usersRepository.getUser(user);
    this.logger.log(`Пользователь(-смена пароля-):${checkUser}`);
    if (checkUser != null) {
      this.logger.log(`Пользователь существует:${checkUser.email}`);
      const isMatch = await bcrypt.compare(user.password, checkUser.password);

      if (isMatch) {
        this.logger.log(`Пароль пользователя совпадает`);
        const result = await this.usersRepository.changePasswordUser(user);
        return this.serviceRes.passwordSuccessUpdate();
      }
     else {
      this.logger.log(`Пользователь ${user.email} не найден`);
      return this.serviceRes.passwordMismatch();
    }
  }
    else{
      this.logger.log('Пользователь не найден');
      return this.serviceRes.userNotFound();

    }
  }




  async updateAccessToken(token: string): Promise<TServiceRes | TServiceResWithoutContent> {
    const result = this.jwtService.decode(token);
    return this.serviceRes.uniqueSuccessRes({
      access_token: await this.jwtService.signAsync(
        { id: result['id'] },
        {
          expiresIn: '15m',
        },
      ),
      refresh_token: token,
    });
  }

 
  async getUserIdByEmail(entity: User): Promise<TServiceRes | TServiceResWithoutContent> {
    this.logger.log(`Получаем информацию о пользователе`);
    const result = await this.usersRepository.getUserIdByEmail(entity);
    if (!result) {
      this.logger.warn(`Пользователь не найден`);
      return this.serviceRes.userNotFound();
    }
    this.logger.log('Информация о пользователе найдена')
    return this.serviceRes.uniqueSuccessRes(result);
  }
}
