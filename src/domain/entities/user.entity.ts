import { randomUUID } from 'crypto';

export type UserProps = {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
};

export class UserEntity {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _email: string;
  private readonly _password: string;
  private readonly _created_at?: Date;
  private _updated_at?: Date;

  constructor(props: UserProps) {
    this._id = props.id;
    this._name = props.name;
    this._email = props.email;
    this._password = props.password;
    this._created_at = props.created_at;
    this._updated_at = props.updated_at;
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

  get created_at(): Date {
    return this._created_at;
  }

  get updated_at(): Date | null {
    return this._updated_at;
  }

  static create(
    props: Omit<UserProps, 'id' | 'created_at' | 'updated_at'>,
  ): UserEntity {
    return new UserEntity({
      ...props,
      id: randomUUID(),
      created_at: new Date(),
    });
  }

  public toJSON(): Omit<UserProps, 'password'> {
    return {
      id: this._id,
      name: this._name,
      email: this._email,
      created_at: this._created_at,
      updated_at: this._updated_at,
    };
  }
}
