import express, { Application, Router } from 'express';
import * as bodyParser from 'body-parser';
import transactionRouter from './router/transaction.router';
import errorMiddleware from './middleware/error.middleware';
import { connectDB, sequelize } from './datasource/db.datasource';

class Server {
    private app;

    constructor() {
        this.app = express();
        this.connectToTheDatabase();
        this.initializeMiddlewares();
        this.initializeRouter();
        this.initializeErrorHandling();
        
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.urlencoded({ extended:true }));
        this.app.use(bodyParser.json({ limit: '1mb' })); // 100kb default
    }

    private async connectToTheDatabase() {
        await connectDB();
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