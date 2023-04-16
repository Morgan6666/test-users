import { Injectable } from '@nestjs/common';
import { TCheckPolisExist, TCheckUserDocument, TGetUserDocument } from 'infrastructure/types/TUser';

@Injectable()
export abstract class IDocumentsRepository<Entity> {
  abstract addUserDocuments(entity: Entity);
  abstract checkUserDocument(entity: Entity): Promise<TCheckUserDocument>;
  abstract addUserPolisDMS(entity: Entity);
  abstract checkPolisExist(entity: Entity): Promise<TCheckPolisExist>;
  abstract getUserDocument(entity: Entity): Promise<TGetUserDocument>;
}
