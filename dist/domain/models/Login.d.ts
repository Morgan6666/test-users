import { IEntity } from 'domain/shared/IEntity';
export declare class Login implements IEntity {
    id?: number;
    email: string;
    password: string;
    constructor(email: string, password: string, id?: number);
    equals(entity: IEntity): any;
}
