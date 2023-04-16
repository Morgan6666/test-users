import { DomainException } from 'domain/exceptions/DomainException';
import { IEntity } from 'domain/shared/IEntity';

export class Login implements IEntity {
  id?: number;
  email: string;
  password: string;
  

  constructor(email: string, password: string, id?: number) {
    this.email = email;
    this.password = password;
    this.id = id;
  }

  equals(entity: IEntity) {
    if (!(entity instanceof Login)) return false;
    return this.email === entity.email;
  }
}
