import { UsersUseCases } from 'application/use-cases/UsersUseCases';
import { CreateUserVM } from 'presentation/view-models/users/CreateUserVM';
import { UserLoginVM } from 'presentation/view-models/users/UserLoginVM';
import { GetUserVM } from 'presentation/view-models/users/GetUserVM';
import { ChangePasswordVM } from 'presentation/view-models/users/ChangePasswordVM';
import { Request } from 'express';
export declare class UsersController {
    private readonly usersUseCases;
    constructor(usersUseCases: UsersUseCases);
    sign(createUser: CreateUserVM, request: Request): Promise<{
        Success: boolean;
        Message: string;
        Code: number;
    }>;
    login(loginUser: UserLoginVM): Promise<{
        Success: boolean;
        Message: string;
        Code: number;
    }>;
    userInfo(userInfo: GetUserVM): Promise<{
        Success: boolean;
        Message: string;
        Code: number;
    }>;
    logout(request: Request): Promise<{
        Success: boolean;
        Message: string;
        Code: number;
    }>;
    changePassword(userInfo: ChangePasswordVM): Promise<{
        Success: boolean;
        Message: string;
        Code: number;
    }>;
    refresToken(request: Request): Promise<{
        Success: boolean;
        Message: string;
        Code: number;
        Content: object;
    }>;
    getUserIdByEmail(data: GetUserVM): Promise<{
        Success: boolean;
        Message: string;
        Code: number;
    }>;
}
