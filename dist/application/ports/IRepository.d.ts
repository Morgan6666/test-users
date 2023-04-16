import { Login } from 'domain/models/Login';
export declare abstract class IRepository<Entity> {
    abstract getUser(entity: Entity): Promise<Login>;
    abstract signUser(entity: Entity): any;
    abstract getUserByEmail(entity: Entity): any;
    abstract changePasswordUser(enitity: Entity): any;
    abstract getUserIdByEmail(entity: Entity): any;
}
