import Razorpay from 'razorpay';
class RazorPayService {

    async createOrder(params: any) {
        try {
            const razorpay = new Razorpay({
                key_id: process.env.RAZORPAY_KEY_ID,
                key_secret: process.env.RAZORPAY_KEY_SECRET,
            });
            const { amount, currency, notes } = params;
            const options = {
                amount: amount * 100, // Convert amount to paise
                receipt: 'receipt_' + Math.random().toString(36).substring(7),
                currency,
                notes,
            };
            const order = await razorpay.orders.create(options);
            
            return {
                ...options,
                id: order.id,
                entity: order.entity,
                amount: order.amount,
                receipt: order.receipt,
                currency: order.currency,
                status: order.status === 'created' ? 1 : 0,
                meta_data: {
                    amount_paid: order.amount_paid,
                    amount_due: order.amount_due,
                    offer_id: order.offer_id,
                    attempts: order.attempts,
                    notes: order.notes,
                    createdAt: order.created_at
                }
            };
        } catch (error) {
            throw new Error(error);
        }
    }

    async verifyOrderPayment(order: any) {
        try {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = order;

            const secret = process.env.RAZORPAY_KEY_SECRET;
            const body = razorpay_order_id + '|' + razorpay_payment_id;
            const isValidSignature = Razorpay.validateWebhookSignature(body, razorpay_signature, secret);
            if (isValidSignature) {
                // Update the order with payment details
                order.status = 'paid';
                order.payment_id = razorpay_payment_id;
                console.log("Payment verification successful");
                return { 
                    status: 'paid',
                    data: order,
                    message: 'Payment verified successfully' 
                };
            } else {
                order.status = 'failed';
                order.payment_id = razorpay_payment_id;
                console.log("Payment verification failed");
                return { 
                    status: 'failed',
                    data: order,
                    message: 'Invalid payment signature' 
                };
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default new RazorPayService();

