import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { IUsersRepository } from 'application/ports/IUsersRepository';
import { User } from 'domain/models/User';
import { UserEntity } from 'infrastructure/database/mapper/UserEntity';

import { BaseRepository } from './BaseRepository';
import { GetUserModel } from 'domain/models/GetUserModel';
import { ChangePasswordModel } from 'domain/models/ChangePasswordModel';

import { HttpService } from '@nestjs/axios';
import { List } from 'lodash';
import { TGetUser, TGetUserByEmail, TGetUserIdByEmail, TSign } from 'infrastructure/types/TUser';

@Injectable()
export class UsersRepository
  extends BaseRepository<User>
  implements IUsersRepository
{
  connection: Connection;
  constructor(
    @InjectConnection() connection: Connection,
    private readonly httpService: HttpService,
  ) {
    super(connection, UserEntity);
    this.connection = connection;
  }
  async getUser(entity: User){
    const result = await this.connection.query(
      `SELECT id,email,password FROM users WHERE email='${entity.email}';`,
    );
    if (result.length == 0) {
      return null;
    }
    return result[0];
  }

  async signUser(entity: User){
    const result = await this.connection.query(`INSERT INTO users(
      first_name,
      last_name,
      email,
      password)

    VALUES('${entity.firstName}','${entity.lastName}', '${entity.email}', '${entity.password}') RETURNING id;`);
    const data = result[0];
    return data;
  }


  async getUserByEmail(entity: GetUserModel): Promise<TGetUserByEmail> {
    const result = await this.connection.query(
      `SELECT first_name,last_name,email FROM users WHERE email='${entity.email}';`,
    );
    if (result.length == 0) {
      return null;
    }
    return result[0];
  }



  async changePasswordUser(entity: ChangePasswordModel) {
    const result = await this.connection.query(
      `UPDATE users SET password='${entity.newPassword}' WHERE email='${entity.email}'`,
    );
    return result;
  }



  async getUserIdByEmail(entity: User): Promise<TGetUserIdByEmail> {
    const result = await this.connection.query(
      `SELECT id FROM users WHERE email='${entity.email}';`,
    );
    if (result.length == 0) {
      return null;
    } else {
      return result;
    }
  }
}
