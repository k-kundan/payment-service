
import { Table, Model, Column, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import TransactionModel from './transaction.model';

@Table({
  timestamps: true,
  tableName: 'vendor_transactions',
})
export class VendorTransactionModel extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @ForeignKey(() => TransactionModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  transaction_id!: string;

  @BelongsTo(() => TransactionModel)
  transactions: TransactionModel;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  vendor_id!: string;

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
  payment_app!: string;

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

  
}

export default VendorTransactionModel;