import { Injectable } from '@nestjs/common';
import { Login } from 'domain/models/Login';
import { List } from 'lodash';

@Injectable()
export abstract class IRepository<Entity> {
  abstract getUser(entity: Entity): Promise<Login>;

  abstract signUser(entity: Entity);

  abstract getUserByEmail(entity: Entity);

  abstract changePasswordUser(enitity: Entity);

  abstract getUserIdByEmail(entity: Entity);
}
