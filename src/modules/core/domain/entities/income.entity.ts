import { randomUUID } from 'crypto';
import { IncomeStatus } from '../enums/income-status.enum';

export type IncomeProps = {
  uuid: string;
  id?: number;
  description: string;
  amount: number;
  dueDate: Date;
  status: IncomeStatus;
  userId: string;
  paymentDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

export class IncomeEntity {
  private readonly _id?: number;
  private readonly _uuid: string;
  private readonly _description: string;
  private readonly _amount: number;
  private readonly _dueDate: Date;
  private _status: IncomeStatus;
  private readonly _userId: string;
  private _paymentDate?: Date;
  private readonly _createdAt?: Date;
  private _updatedAt?: Date;

  constructor(props: IncomeProps) {
    this._id = props.id;
    this._uuid = props.uuid;
    this._description = props.description;
    this._amount = props.amount;
    this._dueDate = props.dueDate;
    this._status = props.status;
    this._userId = props.userId;
    this._paymentDate = props.paymentDate;
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

  get status(): IncomeStatus {
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
      IncomeProps,
      'id' | 'uuid' | 'status' | 'created_at' | 'updated_at'
    >,
  ): IncomeEntity {
    return new IncomeEntity({
      ...props,
      uuid: randomUUID(),
      status: IncomeStatus.PENDING,
      createdAt: new Date(),
    });
  }

  public received(): void {
    if (this._status === IncomeStatus.PENDING) {
      this._status = IncomeStatus.RECEIVED;
      this._paymentDate = new Date();
    }
  }

  public toJSON(): IncomeProps {
    return {
      uuid: this._uuid,
      description: this._description,
      amount: this._amount,
      dueDate: this._dueDate,
      status: this._status,
      paymentDate: this._paymentDate,
      userId: this._userId,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}
