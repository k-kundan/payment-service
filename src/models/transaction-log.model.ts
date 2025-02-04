import { sequelize, DataTypes } from "../datasource/db.datasource";

const TransactionLogModel = sequelize.define("transaction_logs", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  req_id: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  req_payload: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  event: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  res_data: {
    type: DataTypes.JSONB,
    allowNull: true,
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

export default TransactionLogModel;