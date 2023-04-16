"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const UsersUseCases_1 = require("../../application/use-cases/UsersUseCases");
const CreateUserVM_1 = require("../view-models/users/CreateUserVM");
const UserVM_1 = require("../view-models/users/UserVM");
const BadRequestError_1 = require("../errors/BadRequestError");
const UnprocessableEntityError_1 = require("../errors/UnprocessableEntityError");
const UserLoginVM_1 = require("../view-models/users/UserLoginVM");
const GetUserVM_1 = require("../view-models/users/GetUserVM");
const ChangePasswordVM_1 = require("../view-models/users/ChangePasswordVM");
const requestIp = require('request-ip');
let UsersController = class UsersController {
    constructor(usersUseCases) {
        this.usersUseCases = usersUseCases;
    }
    async sign(createUser, request) {
        const useragent = request.headers['user-agent'];
        const newUser = await this.usersUseCases.sign(CreateUserVM_1.CreateUserVM.fromViewModel(createUser), useragent);
        return newUser;
    }
    async login(loginUser) {
        const userLogin = await this.usersUseCases.login(UserLoginVM_1.UserLoginVM.fromViewModel(loginUser));
        return userLogin;
    }
    async userInfo(userInfo) {
        const info = await this.usersUseCases.getUserByEmai(GetUserVM_1.GetUserVM.fromViewModel(userInfo));
        return info;
    }
    async logout(request) {
        const useragent = request.headers['user-agent'];
        const result = await this.usersUseCases.logout(useragent);
        return result;
    }
    async changePassword(userInfo) {
        const result = await this.usersUseCases.changePassword(ChangePasswordVM_1.ChangePasswordVM.fromViewModel(userInfo));
        return result;
    }
    async refresToken(request) {
        const token = request.headers['access-token'].toString();
        const result = await this.usersUseCases.updateAccessToken(token);
        return result;
    }
    async getUserIdByEmail(data) {
        const result = await this.usersUseCases.getUserIdByEmail(GetUserVM_1.GetUserVM.fromViewModel(data));
        return result;
    }
};
__decorate([
    (0, common_1.Post)('sign'),
    (0, swagger_1.ApiOperation)({
        summary: 'Sign User',
    }),
    (0, swagger_1.ApiResponse)({ description: 'User successfull sign', type: UserVM_1.UserVM }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'The request object doesn`t match the expected one',
        type: BadRequestError_1.BadRequestError,
    }),
    (0, swagger_1.ApiUnprocessableEntityResponse)({
        description: 'Validation errro while sign user',
        type: UnprocessableEntityError_1.UnprocessableEntityError,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUserVM_1.CreateUserVM, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "sign", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({
        summary: 'Login User',
    }),
    (0, swagger_1.ApiResponse)({ description: 'User successfull login', type: UserLoginVM_1.UserLoginVM }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'The request object doesnt th expected one',
        type: BadRequestError_1.BadRequestError,
    }),
    (0, swagger_1.ApiUnprocessableEntityResponse)({
        description: 'Validation error while login user',
        type: UnprocessableEntityError_1.UnprocessableEntityError,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserLoginVM_1.UserLoginVM]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('info'),
    (0, swagger_1.ApiOperation)({
        summary: 'User info',
    }),
    (0, swagger_1.ApiResponse)({ description: 'User successfully', type: GetUserVM_1.GetUserVM }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'The request object doesnt th expected one',
        type: BadRequestError_1.BadRequestError,
    }),
    (0, swagger_1.ApiUnprocessableEntityResponse)({
        description: 'Validation error while login user',
        type: UnprocessableEntityError_1.UnprocessableEntityError,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetUserVM_1.GetUserVM]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "userInfo", null);
__decorate([
    (0, common_1.Patch)('logout'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('change'),
    (0, swagger_1.ApiOperation)({
        summary: 'Change password',
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'The request object doesnt th expected one',
        type: BadRequestError_1.BadRequestError,
    }),
    (0, swagger_1.ApiUnprocessableEntityResponse)({
        description: 'Validation error while email user',
        type: UnprocessableEntityError_1.UnprocessableEntityError,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ChangePasswordVM_1.ChangePasswordVM]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Patch)('refresh'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "refresToken", null);
__decorate([
    (0, common_1.Post)('user_id'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetUserVM_1.GetUserVM]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserIdByEmail", null);
UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [UsersUseCases_1.UsersUseCases])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=UsersController.js.map