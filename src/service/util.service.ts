class UtilService {

    public async todo() {
        try {
            return 'util';
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default UtilService;