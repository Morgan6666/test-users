"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var UsersUseCases_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersUseCases = void 0;
const common_1 = require("@nestjs/common");
const IUsersRepository_1 = require("../ports/IUsersRepository");
const UserExceptions_1 = require("../../domain/exceptions/UserExceptions");
const serviceResponse_1 = require("../../infrastructure/utils/serviceResponse");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const secretsConstant_1 = require("../../infrastructure/utils/secretsConstant");
const ioredis_1 = __importDefault(require("ioredis"));
const nestjs_redis_1 = require("@liaoliaots/nestjs-redis");
let UsersUseCases = UsersUseCases_1 = class UsersUseCases {
    constructor(usersRepository, jwtService, redis) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
        this.redis = redis;
        this.logger = new common_1.Logger(UsersUseCases_1.name);
        this.userException = new UserExceptions_1.UserExceptions();
        this.serviceRes = new serviceResponse_1.ServiceResponse();
    }
    async calculateTokens(user) {
        const access_token = await this.jwtService.signAsync(user, {
            expiresIn: '15m',
        });
        const refresh_token = await this.jwtService.signAsync(user, {
            expiresIn: '7d',
        });
        return { access_token, refresh_token };
    }
    async sign(user, user_agent) {
        const checkUser = await this.usersRepository.getUser(user);
        this.logger.log(`Check if user exiss:${checkUser}`);
        if (!checkUser) {
            this.logger.log(`Create new user:${user.email}`);
            let encrPassword = await bcrypt.hash(user.password, secretsConstant_1.salt);
            user.password = encrPassword;
            const result = await this.usersRepository.signUser(user);
            const tokens = await this.calculateTokens(result);
            const red = await this.redis.set(user_agent, tokens.refresh_token);
            return this.serviceRes.uniqueSuccessRes(tokens);
        }
        else {
            this.logger.log(`user already exists:${user.email}`);
            return this.serviceRes.userAlreadyExist();
        }
    }
    async login(user) {
        const checkUser = await this.usersRepository.getUser(user);
        if (!checkUser) {
            this.logger.warn(`Пользователь не найден:${user.email}`);
            return this.serviceRes.userNotFound();
        }
        else {
            const isMatch = await bcrypt.compare(user.password, checkUser.password);
            if (isMatch) {
                this.logger.log(`Пользователь ${user.email} вошёл в систему`);
                const tokens = await this.calculateTokens(checkUser);
                return this.serviceRes.uniqueSuccessRes(tokens);
            }
            else {
                this.logger.log('Пароли не совпадают');
                return this.serviceRes.passwordMismatch();
            }
        }
    }
    async logout(user_agent) {
        this.logger.log('Проверяем наличие сессии пользователя в redis');
        const checkTokenRedis = await this.redis.get(user_agent);
        if (checkTokenRedis) {
            this.logger.log('Удаляем сессию пользователя');
            const delSession = await this.redis.del(user_agent);
            return this.serviceRes.usersSessionSuccessDelete();
        }
        else {
            this.logger.log('Сессия пользователя не существует');
            return this.serviceRes.userSessionNotFound();
        }
    }
    async getUserByEmai(user) {
        this.logger.log('GetUser by email');
        const result = await this.usersRepository.getUserByEmail(user);
        if (!result) {
            this.logger.warn(`Пользователь не найден:${result}`);
            return this.serviceRes.userNotFound();
        }
        else {
            this.logger.log(`Пользователь:${user.email}`);
            return this.serviceRes.uniqueSuccessRes(result);
        }
    }
    async changePassword(user) {
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
        else {
            this.logger.log('Пользователь не найден');
            return this.serviceRes.userNotFound();
        }
    }
    async updateAccessToken(token) {
        const result = this.jwtService.decode(token);
        return this.serviceRes.uniqueSuccessRes({
            access_token: await this.jwtService.signAsync({ id: result['id'] }, {
                expiresIn: '15m',
            }),
            refresh_token: token,
        });
    }
    async getUserIdByEmail(entity) {
        this.logger.log(`Получаем информацию о пользователе`);
        const result = await this.usersRepository.getUserIdByEmail(entity);
        if (!result) {
            this.logger.warn(`Пользователь не найден`);
            return this.serviceRes.userNotFound();
        }
        this.logger.log('Информация о пользователе найдена');
        return this.serviceRes.uniqueSuccessRes(result);
    }
};
UsersUseCases = UsersUseCases_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, nestjs_redis_1.InjectRedis)()),
    __metadata("design:paramtypes", [IUsersRepository_1.IUsersRepository,
        jwt_1.JwtService,
        ioredis_1.default])
], UsersUseCases);
exports.UsersUseCases = UsersUseCases;
//# sourceMappingURL=UsersUseCases.js.map