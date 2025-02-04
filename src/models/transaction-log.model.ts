import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'transactions_log',
})
export class TransactionLogModel extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;
  
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  req_id!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  req_time!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  req_method!: string;

  @Column({
    type: DataType.JSONB,
    allowNull: false,
  })
  req_meta_data!: any;

  @Column({
    type: DataType.JSONB,
    allowNull: false,
  })
  req_header!: any;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  req_path!: string;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
    defaultValue: null,
  })
  req_payload!: any;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: '',
  })
  event!: string;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
    defaultValue: null,
  })
  res_data!: any;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  res_status_code!: any;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: Date.now(),
  })
  res_time!: any;
}

export default TransactionLogModel;