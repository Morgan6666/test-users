import { IUsersRepository } from 'application/ports/IUsersRepository';
import { UserExceptions } from 'domain/exceptions/UserExceptions';
import { ChangePasswordModel } from 'domain/models/ChangePasswordModel';
import { GetUserModel } from 'domain/models/GetUserModel';
import { Login } from 'domain/models/Login';
import { User } from 'domain/models/User';
import { ServiceResponse } from 'infrastructure/utils/ServiceResponse';
import { JwtService } from '@nestjs/jwt';
import { JwtTokenModel } from 'domain/models/JwtToken';
import Redis from 'ioredis';
export declare class UsersUseCases {
    private readonly usersRepository;
    private jwtService;
    private readonly redis;
    private readonly logger;
    userException: UserExceptions;
    serviceRes: ServiceResponse;
    private configService;
    constructor(usersRepository: IUsersRepository, jwtService: JwtService, redis: Redis);
    calculateTokens(user: JwtTokenModel): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    sign(user: User, user_agent: string): Promise<{
        Success: boolean;
        Message: string;
        Code: number;
    }>;
    login(user: Login): Promise<{
        Success: boolean;
        Message: string;
        Code: number;
    }>;
    logout(user_agent: string): Promise<{
        Success: boolean;
        Message: string;
        Code: number;
    }>;
    getUserByEmai(user: GetUserModel): Promise<{
        Success: boolean;
        Message: string;
        Code: number;
    }>;
    changePassword(user: ChangePasswordModel): Promise<{
        Success: boolean;
        Message: string;
        Code: number;
    }>;
    updateAccessToken(token: string): Promise<{
        Success: boolean;
        Message: string;
        Code: number;
        Content: object;
    }>;
    getUserIdByEmail(entity: User): Promise<{
        Success: boolean;
        Message: string;
        Code: number;
    }>;
}
