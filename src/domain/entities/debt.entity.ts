import { randomUUID } from 'crypto';
import { DebtStatus } from '../enums/debt-status.enum';

export type DebtProps = {
  id: string;
  description: string;
  amount: number;
  dueDate: Date;
  status: DebtStatus;
  paymentDate?: Date;
  tags?: string[];
  created_at?: Date;
  updated_at?: Date;
};

export class DebtEntity {
  private readonly _id: string;
  private readonly _description: string;
  private readonly _amount: number;
  private readonly _dueDate: Date;
  private _status: DebtStatus;
  private _paymentDate?: Date;
  private _tags?: string[];
  private readonly _created_at?: Date;
  private _updated_at?: Date;

  constructor(props: DebtProps) {
    this._id = props.id;
    this._description = props.description;
    this._amount = props.amount;
    this._dueDate = props.dueDate;
    this._status = props.status;
    this._paymentDate = props.paymentDate;
    this._tags = props.tags || [];
    this._created_at = props.created_at;
    this._updated_at = props.updated_at;
  }

  get id(): string {
    return this._id;
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

  get paymentDate(): Date | null {
    return this._paymentDate;
  }

  get created_at(): Date {
    return this._created_at;
  }

  get updated_at(): Date | null {
    return this._updated_at;
  }

  static create(
    props: Omit<DebtProps, 'id' | 'status' | 'created_at' | 'updated_at'>,
  ): DebtEntity {
    return new DebtEntity({
      ...props,
      id: randomUUID(),
      status: DebtStatus.PENDING,
      created_at: new Date(),
    });
  }

  public payDebt(): void {
    this._status = DebtStatus.PAID;
    this._paymentDate = new Date();
  }

  public toJSON(): DebtProps {
    return {
      id: this._id,
      description: this._description,
      amount: this._amount,
      dueDate: this._dueDate,
      status: this._status,
      paymentDate: this._paymentDate,
      tags: this._tags,
      created_at: this._created_at,
      updated_at: this._updated_at,
    };
  }
}
