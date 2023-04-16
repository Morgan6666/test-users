import { Connection } from 'typeorm';
import { IUsersRepository } from 'application/ports/IUsersRepository';
import { User } from 'domain/models/User';
import { BaseRepository } from './BaseRepository';
import { GetUserModel } from 'domain/models/GetUserModel';
import { ChangePasswordModel } from 'domain/models/ChangePasswordModel';
import { HttpService } from '@nestjs/axios';
import { TGetUserByEmail, TGetUserIdByEmail } from 'infrastructure/types/TUser';
export declare class UsersRepository extends BaseRepository<User> implements IUsersRepository {
    private readonly httpService;
    connection: Connection;
    constructor(connection: Connection, httpService: HttpService);
    getUser(entity: User): Promise<any>;
    signUser(entity: User): Promise<any>;
    getUserByEmail(entity: GetUserModel): Promise<TGetUserByEmail>;
    changePasswordUser(entity: ChangePasswordModel): Promise<any>;
    getUserIdByEmail(entity: User): Promise<TGetUserIdByEmail>;
}
