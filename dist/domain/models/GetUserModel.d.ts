import { IEntity } from 'domain/shared/IEntity';
export declare class GetUserModel implements IEntity {
    email: string;
    constructor(email: string);
    equals(entity: IEntity): boolean;
}
