import { Pool } from 'pg';

const pool = new Pool ({
    max: 20,
    //connectionString: 'postgres://root:newPassword@localhost:port/dbname',
    connectionString: 'postgres://postgres:password123@postgres:5432/paymentDB',
    idleTimeoutMillis: 30000
});

export default pool;