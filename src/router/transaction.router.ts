import express, { Router } from 'express';
import loggerMiddleware from '../middleware/logger.middleware'
import TransactionController from '../controller/transaction.controller';

const router = Router();
const transactionController = new TransactionController();

router.get('/', loggerMiddleware, transactionController.get);

export default router;