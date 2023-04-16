import { DomainException } from 'domain/exceptions/DomainException';
import { IEntity } from 'domain/shared/IEntity';

export class GetUserModel implements IEntity {
  email: string;

  constructor(email: string) {
    this.email = email;
  }

  equals(entity: IEntity): boolean {
    if (!(entity instanceof GetUserModel)) return false;
    return this.email === entity.email;
  }
}
