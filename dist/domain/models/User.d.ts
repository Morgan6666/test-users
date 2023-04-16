import { IEntity } from 'domain/shared/IEntity';
export declare class User implements IEntity {
    firstName?: string;
    lastName?: string;
    email: string;
    password?: string;
    user_id?: number;
    constructor(firstName?: string, lastName?: string, email?: string, password?: string, user_id?: number);
    equals(entity: IEntity): any;
}
