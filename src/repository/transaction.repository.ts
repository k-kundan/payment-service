import { sequelize } from '../datasource/db.datasource';
import VendorTransactionModel from '../models/vendor-transaction.model';
import TransactionModel from '../models/transaction.model';

class TransactionRepository {

    public async getVendorTransactions(vendor_id, limit, offset) {
        let tnx;
        try {
            tnx = await sequelize.transaction();
            const transactions = await VendorTransactionModel.findAll({
                where: {
                    vendor_id: vendor_id
                },
                include:[{
                    model: TransactionModel,
                    required: true,      
                }],
                order:[
                    ['created_at', 'DESC']
                ],
                limit: limit,
                offset: offset,
                transaction: tnx
            });
            await tnx.commit();
            return transactions;
        } catch (error) {
            if (tnx) await tnx.rollback();

            throw new Error(error);
        }
    }

    public async createTransaction(order) {
        let tnx;
        try {
            tnx = await sequelize.transaction();
            const { amount, receipt, status, created_by, payment_mode, payment_gateway, meta_data } = order;
            const createdOrder = await TransactionModel.create({
                amount: amount, 
                status: status, 
                payment_mode: payment_mode,
                payment_gateway: payment_gateway,
                meta_data: meta_data, 
                receipt: receipt,
                created_by: created_by
            });
            await tnx.commit();
            return createdOrder;
        } catch (error) {
            if (tnx) await tnx.rollback();

            throw new Error(error);
        }
    }

    public async createVendorTransactionRecord(order) {
        let tnx;
        try {
            tnx = await sequelize.transaction();
            const { transaction_id, vendor_id, payment_mode, status, payment_app, receipt, created_by, meta_data } = order;
            const vendor_order = await VendorTransactionModel.create({
                transaction_id: transaction_id, 
                vendor_id: vendor_id,
                payment_mode: payment_mode,
                status: status, 
                payment_app: payment_app,
                receipt: receipt,
                meta_data: meta_data, 
                created_by: created_by
            });
            await tnx.commit();
            return vendor_order;
        } catch (error) {
            if (tnx) await tnx.rollback();

            throw new Error(error);
        }
    }

    public async updateTransaction(order) {
        let tnx;
        try {
            tnx = await sequelize.transaction();
            return true;
        } catch (error) {
            if (tnx) await tnx.rollback();

            throw new Error(error);
        }
    }
}

export default TransactionRepository;