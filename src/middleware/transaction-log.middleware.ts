import { NextFunction, Request, Response } from 'express';
import TransactionRepository from '../repository/transaction.repository';
import { constant } from '../constants/transaction.constant';
import logger from '../utils/logger.util';

declare global {
    namespace Express {
        interface Request {
            id?: string;
            requestTimestamp?: string | number;
        }
        interface Response {
            responseTimestamp?: string | number;
        }
    }
}

const timestampHandler = (request: Request, response: Response, next: NextFunction) => {
    request.requestTimestamp = Date.now();
    response.once('finish', () => {
        response.responseTimestamp = Date.now();
    });
    next();
};

const transactionLogger = (request: Request, response: Response, next: NextFunction) => {
    const send = response.send;
    const eventKey = request.path.split('/').pop();
    response.send = (body) => {
        if (constant.transaction_url.includes(request.path)) {
                TransactionRepository.createTransactionLogRecord({
                    req_id: request.id,
                    req_payload: {
                        body: request.body,
                        query: request.query
                    },
                    req_time: request.requestTimestamp,
                    req_method: request.method,
                    req_meta_data: {
                        protocol: request.protocol,
                        hostname: request.hostname,
                        path: request.path,
                        originalUrl: request.originalUrl,
                        subdomains: request.subdomains,
                    },
                    req_header: {
                        contentType: request.header('Content-Type'),
                        userAgent: request.header('user-agent'),
                        authorization: request.header('Authorization')
                    },
                    req_path: request.path,
                    event: constant.event[eventKey],
                    res_data: body,
                    res_status_code: response.statusCode,
                    res_time: response.responseTimestamp
                })
                .then((data) => {
                    logger.info(`saved data ${data}`);
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        response.send = send;
        return response.send(body);
    }
    next();
}

export { timestampHandler, transactionLogger };




