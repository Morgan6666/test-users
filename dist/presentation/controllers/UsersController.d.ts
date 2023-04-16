import { UsersUseCases } from 'application/use-cases/UsersUseCases';
import { CreateUserVM } from 'presentation/view-models/users/CreateUserVM';
import { UserLoginVM } from 'presentation/view-models/users/UserLoginVM';
import { GetUserVM } from 'presentation/view-models/users/GetUserVM';
import { ChangePasswordVM } from 'presentation/view-models/users/ChangePasswordVM';
import { Request } from 'express';
export declare class UsersController {
    private readonly usersUseCases;
    constructor(usersUseCases: UsersUseCases);
    sign(createUser: CreateUserVM, request: Request): Promise<import("../../infrastructure/types/TServiceRes").TServiceRes | import("../../infrastructure/types/TServiceRes").TServiceResWithoutContent>;
    login(loginUser: UserLoginVM): Promise<import("../../infrastructure/types/TServiceRes").TServiceRes | import("../../infrastructure/types/TServiceRes").TServiceResWithoutContent>;
    userInfo(userInfo: GetUserVM): Promise<import("../../infrastructure/types/TServiceRes").TServiceRes | import("../../infrastructure/types/TServiceRes").TServiceResWithoutContent>;
    logout(request: Request): Promise<import("../../infrastructure/types/TServiceRes").TServiceRes | import("../../infrastructure/types/TServiceRes").TServiceResWithoutContent>;
    changePassword(userInfo: ChangePasswordVM): Promise<import("../../infrastructure/types/TServiceRes").TServiceRes | import("../../infrastructure/types/TServiceRes").TServiceResWithoutContent>;
    refresToken(request: Request): Promise<import("../../infrastructure/types/TServiceRes").TServiceRes | import("../../infrastructure/types/TServiceRes").TServiceResWithoutContent>;
    getUserIdByEmail(data: GetUserVM): Promise<import("../../infrastructure/types/TServiceRes").TServiceRes | import("../../infrastructure/types/TServiceRes").TServiceResWithoutContent>;
}
