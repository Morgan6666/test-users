import { TGetUserByEmail, TGetUserIdByEmail } from 'infrastructure/types/TUser';
export declare abstract class IRepository<Entity> {
    abstract getUser(entity: Entity): any;
    abstract signUser(entity: Entity): any;
    abstract getUserByEmail(entity: Entity): Promise<TGetUserByEmail>;
    abstract changePasswordUser(enitity: Entity): any;
    abstract getUserIdByEmail(entity: Entity): Promise<TGetUserIdByEmail>;
}
