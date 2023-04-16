import { DomainException } from 'domain/exceptions/DomainException';
import { IEntity } from 'domain/shared/IEntity';

export class User implements IEntity {
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string;
  user_id?: number;

  constructor(
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    user_id?: number,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.user_id = user_id;
  }

  equals(entity: IEntity) {
    if (!(entity instanceof User)) return false;

    return this.email === entity.email;
  }
}
