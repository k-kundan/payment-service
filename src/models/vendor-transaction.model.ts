import { sequelize, DataTypes } from "../datasource/db.datasource";

const VendorTransactionModel = sequelize.define("vendor_transactions", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  transaction_id: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  vendor_id: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  payment_mode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  payment_app: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  receipt: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  meta_data: {
    type: DataTypes.JSONB,
    allowNull: true,
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

export default VendorTransactionModel;