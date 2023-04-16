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
exports.UsersRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const UserEntity_1 = require("../mapper/UserEntity");
const BaseRepository_1 = require("./BaseRepository");
const axios_1 = require("@nestjs/axios");
let UsersRepository = class UsersRepository extends BaseRepository_1.BaseRepository {
    constructor(connection, httpService) {
        super(connection, UserEntity_1.UserEntity);
        this.httpService = httpService;
        this.connection = connection;
    }
    async getUser(entity) {
        const result = await this.connection.query(`SELECT id,email,password FROM users WHERE email='${entity.email}';`);
        if (result.length == 0) {
            return null;
        }
        return result[0];
    }
    async signUser(entity) {
        const result = await this.connection.query(`INSERT INTO users(
      first_name,
      last_name,
      email,
      password)

    VALUES('${entity.firstName}','${entity.lastName}', '${entity.email}', '${entity.password}') RETURNING id;`);
        const data = result[0];
        return data;
    }
    async getUserByEmail(entity) {
        const result = await this.connection.query(`SELECT first_name,last_name,email FROM users WHERE email='${entity.email}';`);
        if (result.length == 0) {
            return null;
        }
        return result[0];
    }
    async changePasswordUser(entity) {
        const result = await this.connection.query(`UPDATE users SET password='${entity.newPassword}' WHERE email='${entity.email}'`);
        return result;
    }
    async getUserIdByEmail(entity) {
        const result = await this.connection.query(`SELECT id FROM users WHERE email='${entity.email}';`);
        if (result.length == 0) {
            return null;
        }
        else {
            return result;
        }
    }
};
UsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectConnection)()),
    __metadata("design:paramtypes", [typeorm_2.Connection,
        axios_1.HttpService])
], UsersRepository);
exports.UsersRepository = UsersRepository;
//# sourceMappingURL=UsersRepository.js.map