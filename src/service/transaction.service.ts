class TransactionService {

    public async todo() {
        try {
            return 'transaction';
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default TransactionService;