import { Request, Response } from 'express';
import TransactionRepository from '../repository/transaction.repository';
import RazorPayService from '../service/razorpay.service';

class TransactionController {

    constructor() {}

    public async createOrder(request: Request, response: Response) {
        try {
            const order = request.body;
            const createdOrder = await RazorPayService.createOrder(order);
            let orderResponse: any = {
                order_id: createdOrder.id,
                amount: createdOrder.amount,
                status: "initiated",
                payment_mode: order.payment_mode,
                payment_app: order.payment_app,
                vendor_id: order.vendor_id,
                currency: order.currency,
                notes: createdOrder.notes,
                payment_gateway: "RAZORPAY",
                meta_data: createdOrder.meta_data,
                receipt: createdOrder.receipt,
                created_by: "SYSTEM",
            };
            const transactionData = await TransactionRepository.createTransaction(orderResponse);
            orderResponse.transaction_id = transactionData.id;
            const vendorOrderData = await TransactionRepository.createVendorTransactionRecord(orderResponse);
            response.status(200).json({
                data: {
                    ...transactionData,
                    ...vendorOrderData
                },
                status: true,
                message: 'Order created successfully'
            });
        } catch (error) {
            response.status(400).send(error);
        }
    }

    public async verifyPayment(request: Request, response: Response) {
        try {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = request.body;
            const order = await TransactionRepository.getTransactionByOrderId(razorpay_order_id);
            if (!order) {
                response.status(400).send('INVALID ORDER');
            }
            const { data, status} = await RazorPayService.verifyOrderPayment({ razorpay_order_id, razorpay_payment_id, razorpay_signature });
            order.status = status;
            const transactionData = await TransactionRepository.createTransaction(order);
            const vendorOrderData = await TransactionRepository.updateVendorTransactionRecord(order.id, status);
            response.status(200).json({
                data: {
                    ...transactionData,
                    ...vendorOrderData
                },
                status: true,
                message: 'Payment verified successfully'
            });
        } catch (error) {
            response.status(400).send(error);
        }
    }

    public async getOrders(request: Request, response: Response) {
        try {
            const {vendor_id} =  request.params;
            const { limit, offset } = request.query;
            const rows = await TransactionRepository.getVendorTransactions(vendor_id, Number(limit || 10), Number(offset || 0));
            response.status(200).json({
                data: rows,
                status: true,
                message: 'Orders fetched successfully'
            });
        } catch (error) {
            response.status(400).send(error);
        }
    }
}

export default TransactionController;