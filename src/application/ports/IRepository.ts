import { Injectable } from '@nestjs/common';
import { Login } from 'domain/models/Login';
import { TGetUser, TGetUserByEmail, TGetUserIdByEmail, TSign } from 'infrastructure/types/TUser';
import { List } from 'lodash';

@Injectable()
export abstract class IRepository<Entity> {
  abstract getUser(entity: Entity);

  abstract signUser(entity: Entity);

  abstract getUserByEmail(entity: Entity): Promise<TGetUserByEmail>;

  abstract changePasswordUser(enitity: Entity);

  abstract getUserIdByEmail(entity: Entity): Promise<TGetUserIdByEmail>;
}
