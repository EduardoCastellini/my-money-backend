import { randomUUID } from 'crypto';

export type UserProps = {
  id?: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class UserEntity {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _email: string;
  private readonly _password: string;
  private readonly _createdAt?: Date;
  private _updatedAt?: Date;

  constructor(props: UserProps) {
    this._id = props.id;
    this._name = props.name;
    this._email = props.email;
    this._password = props.password;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date | null {
    return this._updatedAt;
  }

  static create(
    props: Omit<UserProps, 'id' | 'createdAt' | 'updatedAt'>,
  ): UserEntity {
    return new UserEntity({
      ...props,
      id: randomUUID(),
      createdAt: new Date(),
    });
  }

  public toJSON(): Omit<UserProps, 'password'> {
    return {
      id: this._id,
      name: this._name,
      email: this._email,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}
