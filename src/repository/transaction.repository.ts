import pool from '../datasource/db.datasource';

class TransactionRepository {

    public async getTransactions() {
        try {
            const client = await pool.connect();

            const sql = "SELECT * FROM transaction";
            const { rows } = await client.query(sql);
            const result = rows;

            client.release();
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default TransactionRepository;