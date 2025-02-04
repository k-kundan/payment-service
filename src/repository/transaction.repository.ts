import sequelize from '../datasource/db.datasource';
import VendorTransactionModel from '../models/vendor-transaction.model';
import TransactionModel from '../models/transaction.model';
import { Transaction } from 'sequelize';
import TransactionLogModel from '../models/transaction-log.model';

class TransactionRepository {

    public async getVendorTransactions(vendor_id: any, limit: number, offset: number) {
        let tnx: Transaction;
        console.log(vendor_id)
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
                    ['createdAt', 'DESC']
                ],
                limit: limit,
                offset: offset,
                transaction: tnx
            });
            await tnx.commit();
            return transactions;
        } catch (error) {
            console.log(error)
            if (tnx) await tnx.rollback();

            throw new Error(error);
        }
    }

    public async createTransaction(order: { id?: string; entity?: string; order_id?: string; amount: any; receipt: any; currency?: string; status: any; meta_data: any; notes?: any; payment_gateway: any; created_by?: any; payment_mode?: any; }) {
        let tnx: Transaction;
        try {
            tnx = await sequelize.transaction();
            const { amount, receipt, status, created_by, payment_mode, order_id, payment_gateway, meta_data } = order;
            const createdOrder = await TransactionModel.create({
                amount: amount, 
                status: status, 
                payment_mode: payment_mode,
                payment_gateway: payment_gateway,
                meta_data: meta_data, 
                receipt: receipt,
                order_id: order_id,
                created_by: created_by
            }, {transaction: tnx, plain: true});
            await tnx.commit();
            return createdOrder.get({ plain: true });
        } catch (error) {
            if (tnx) await tnx.rollback();

            throw new Error(error);
        }
    }

    public async getTransactionByOrderId(order_id: string) {
        let tnx: Transaction;
        try {
            tnx = await sequelize.transaction();
            const transaction = await TransactionModel.findOne({
                where: {
                    order_id: order_id
                },
                transaction: tnx
            });
            await tnx.commit();
            return transaction.get({ plain: true });
        } catch (error) {
            if (tnx) await tnx.rollback();

            throw new Error(error);
        }
    }

    public async updateTransaction(order_id: string, data: { [x: string]: any; }) {
        let tnx: Transaction;
        try {
            tnx = await sequelize.transaction();
            const createdOrder = await TransactionModel.update(data, { 
                where: { 
                    order_id: order_id 
                }, 
                transaction: tnx 
            });
            await tnx.commit();
            return createdOrder;
        } catch (error) {
            if (tnx) await tnx.rollback();

            throw new Error(error);
        }
    }

    public async createVendorTransactionRecord(order: { id?: string; entity?: string; amount?: string | number; receipt: any; currency?: string; status: any; meta_data: any; notes?: any; payment_gateway?: string; transaction_id?: any; vendor_id?: any; payment_mode?: any; payment_app?: any; created_by?: any; }) {
        let tnx: Transaction;
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
            return vendor_order.get({ plain: true });
        } catch (error) {
            if (tnx) await tnx.rollback();

            throw new Error(error);
        }
    }

    public async updateVendorTransactionRecord(transaction_id: string, status: string) {
        let tnx: Transaction;
        try {
            tnx = await sequelize.transaction();
            await VendorTransactionModel.update({
                status: status
            }, {
                where: {
                    transaction_id: transaction_id
                },
                transaction: tnx
            });
            const updatedOrder = await VendorTransactionModel.findOne({
                where: { 
                    transaction_id: transaction_id 
                },
                transaction: tnx
            });
            await tnx.commit();
            return updatedOrder;
        } catch (error) {
            if (tnx) await tnx.rollback();

            throw new Error(error);
        }
    }

    public async createTransactionLogRecord(order) {
        let tnx: Transaction;
        try {
            tnx = await sequelize.transaction();
            const { req_id, req_payload, req_time, req_method, req_meta_data, req_header, req_path, event, res_data, res_status_code, res_time } = order;
            const vendor_order = await TransactionLogModel.create({
                req_id: req_id, 
                req_path: req_path,
                req_method: req_method,
                req_header: req_header,
                req_meta_data: req_meta_data,
                req_payload: req_payload,
                req_time: req_time,
                event: event, 
                res_data: res_data,
                res_time: res_time,
                res_status_code: res_status_code
            });
            await tnx.commit();
            return vendor_order.get({ plain: true });
        } catch (error) {
            if (tnx) await tnx.rollback();

            throw new Error(error);
        }
    }
}

export default new TransactionRepository();