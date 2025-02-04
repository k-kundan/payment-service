
import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import VendorTransactionModel from './vendor-transaction.model';

@Table({
  timestamps: true,
  tableName: 'transactions',
})
export class TransactionModel extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
  })
  amount!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  order_id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  payment_mode!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  payment_gateway!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  receipt!: string;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
    defaultValue: null,
  })
  meta_data!: any;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: 'SYSTEM',
  })
  created_by!: string;

  @HasMany(() => VendorTransactionModel)
  vendor_transactions: VendorTransactionModel[];
}

export default TransactionModel;