import { config } from 'dotenv';
const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
config({ path: envFile });
import express from 'express';
import * as bodyParser from 'body-parser';
import requestID from 'express-request-id';
import transactionRouter from './router/transaction.router';
import errorMiddleware from './middleware/error.middleware';
import sequelize from './datasource/db.datasource';
import { Express } from 'express-serve-static-core';
import {timestampHandler, transactionLogger} from './middleware/transaction-log.middleware';
class Server {
    private app: Express;

    constructor() {
        this.app = express();
        this.connectToTheDatabase();
        this.initializeMiddlewares();
        this.initializeErrorHandling();
        this.initializeRouter();
    }

    private initializeMiddlewares() {
        this.app.use(requestID());
        this.app.use(timestampHandler)
        this.app.use(bodyParser.urlencoded({ extended:true }));
        this.app.use(bodyParser.json({ limit: '1mb' })); // 100kb default
        this.app.use(transactionLogger)
    }

    private async connectToTheDatabase() {
        sequelize.sync({ force: false }).then(() => {
            console.log("✅Synced database successfully...");
        });
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    private initializeRouter() {
        this.app.use('/transaction', transactionRouter);
    }

    public start = (port: number) => {
        return new Promise((resolve, reject) => {
            this.app.listen(port, () => {
                resolve(port);
            }).on('error', (err: Object) => reject(err));
        });
    }
}

export default Server;