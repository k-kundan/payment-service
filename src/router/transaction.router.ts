import express, { type Router }from 'express';
import loggerMiddleware from '../middleware/logger.middleware'
import TransactionController from '../controller/transaction.controller';

const transactionController = new TransactionController();
const transactionRouter: Router = express.Router();

transactionRouter.post('/create-order', loggerMiddleware, transactionController.createOrder);
transactionRouter.get('/verify-order', loggerMiddleware, transactionController.verifyPayment);
transactionRouter.get('/get-order/:vendor_id', loggerMiddleware, transactionController.getOrders);

export default transactionRouter;
