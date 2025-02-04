import { Request, Response } from 'express';
import TransactionRepository from '../repository/transaction.repository';
import RazorPayService from '../service/razorpay.service';

class TransactionController {
    transactionRepository: TransactionRepository;
    razorPayService: RazorPayService;

    constructor() {
        this.transactionRepository = new TransactionRepository();
        this.razorPayService = new RazorPayService();
    }

    public async createOrder(request: Request, response: Response) {
        try {
            const order = request.body;
            const createdOrder = await this.razorPayService.createOrder(order);
            let orderResponse = {
                payment_gateway: 'RAZORPAY',
                ...createdOrder
            };
            const transaction = await this.transactionRepository.createTransaction(orderResponse);
            const vendorOrder = await this.transactionRepository.createVendorTransactionRecord(orderResponse);
            response.status(200).json({
                data: {
                    ...transaction,
                    ...vendorOrder
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
            const payment = request.body;
            const paymentResult = await this.razorPayService.verifyOrderPayment(payment);
            const rows = await this.transactionRepository.updateTransaction(paymentResult);
            response.status(200).json({
                data: rows,
                status: true,
                message: 'Payment verified successfully'
            });
        } catch (error) {
            response.status(400).send(error);
        }
    }

    public async getOrders(request: Request, response: Response) {
        try {
            const vendor_id =  request.params;
            const { limit, offset } = request.query;
            const rows = await this.transactionRepository.getVendorTransactions(vendor_id, limit, offset);
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