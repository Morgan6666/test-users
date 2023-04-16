import { TCheckPolisExist, TCheckUserDocument, TGetUserDocument } from 'infrastructure/types/TUser';
export declare abstract class IDocumentsRepository<Entity> {
    abstract addUserDocuments(entity: Entity): any;
    abstract checkUserDocument(entity: Entity): Promise<TCheckUserDocument>;
    abstract addUserPolisDMS(entity: Entity): any;
    abstract checkPolisExist(entity: Entity): Promise<TCheckPolisExist>;
    abstract getUserDocument(entity: Entity): Promise<TGetUserDocument>;
}
