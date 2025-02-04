import pool from '../datasource/db.datasource';
import TransactionRepository from '../repository/transaction.repository';


class TransactionController {

    public async get(req, res) {
        try {
            const rows = await TransactionRepository.getTransactions();
            res.send(rows);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

export default TransactionController;