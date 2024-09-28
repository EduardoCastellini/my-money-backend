import { randomUUID } from 'crypto';
import { DebtStatus } from '../enums/debt-status.enum';

export type DebtProps = {
  uuid: string;
  id?: number;
  description: string;
  amount: number;
  dueDate: Date;
  status: DebtStatus;
  userId: string;
  paymentDate?: Date;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
};

export class DebtEntity {
  private readonly _id?: number;
  private readonly _uuid: string;
  private readonly _description: string;
  private readonly _amount: number;
  private readonly _dueDate: Date;
  private _status: DebtStatus;
  private readonly _userId: string;
  private _paymentDate?: Date;
  private _tags?: string[];
  private readonly _createdAt?: Date;
  private _updatedAt?: Date;

  constructor(props: DebtProps) {
    this._id = props.id;
    this._uuid = props.uuid;
    this._description = props.description;
    this._amount = props.amount;
    this._dueDate = props.dueDate;
    this._status = props.status;
    this._userId = props.userId;
    this._paymentDate = props.paymentDate;
    this._tags = props.tags || [];
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  get id(): number {
    return this._id;
  }

  get uuid(): string {
    return this._uuid;
  }

  get description(): string {
    return this._description;
  }

  get amount(): number {
    return this._amount;
  }

  get dueDate(): Date {
    return this._dueDate;
  }

  get tags(): string[] | null {
    return this._tags;
  }

  get status(): DebtStatus {
    return this._status;
  }

  get userId(): string {
    return this._userId;
  }

  get paymentDate(): Date | null {
    return this._paymentDate;
  }

  get created_at(): Date {
    return this._createdAt;
  }

  get updated_at(): Date | null {
    return this._updatedAt;
  }

  static create(
    props: Omit<
      DebtProps,
      'id' | 'uuid' | 'status' | 'created_at' | 'updated_at'
    >,
  ): DebtEntity {
    return new DebtEntity({
      ...props,
      uuid: randomUUID(),
      status: DebtStatus.PENDING,
      createdAt: new Date(),
    });
  }

  public payDebt(): void {
    if (this._status === DebtStatus.PENDING) {
      this._status = DebtStatus.PAID;
      this._paymentDate = new Date();
    }
  }

  public toJSON(): DebtProps {
    return {
      uuid: this._uuid,
      description: this._description,
      amount: this._amount,
      dueDate: this._dueDate,
      status: this._status,
      paymentDate: this._paymentDate,
      userId: this._userId,
      tags: this._tags,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}
