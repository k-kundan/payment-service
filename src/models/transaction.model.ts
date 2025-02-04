import { sequelize, DataTypes } from "../datasource/db.datasource";

const TransactionModel = sequelize.define("transactions", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  payment_mode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  payment_gateway: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  meta_data: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  receipt: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_by: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
});

export default TransactionModel;