import express, { Router } from 'express';
import loggerMiddleware from '../middleware/logger.middleware'
import TransactionController from '../controller/transaction.controller';

const router = Router();
const transactionController = new TransactionController();

router.post('/create-order', loggerMiddleware, transactionController.createOrder);
router.get('/verify-order', loggerMiddleware, transactionController.verifyPayment);
router.get('/get-order/:vendor_id', loggerMiddleware, transactionController.getOrders);

export default router;