import Razorpay from 'razorpay';
import * as crypto from 'crypto';

class RazorPayService {

    public async createOrder(options: any) {
        try {
            const razorpay = new Razorpay({
                key_id: process.env.RAZORPAY_KEY_ID,
                key_secret: process.env.RAZORPAY_KEY_SECRET,
            });
            options.receipt = 'receipt_' + Math.random().toString(36).substring(7);
            const order = await razorpay.orders.create(options);
            return {
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
                    created_at: order.created_at
                }
            };
        } catch (error) {
            throw new Error(error);
        }
    }

    public async verifyOrderPayment(order: any) {
        try {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = order;

            const sign = razorpay_order_id + '|' + razorpay_payment_id;
            const razorSign = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
                .update(sign.toString())
                .digest('hex');

            if (razorpay_signature === razorSign) {
                console.log("Payment verified successfully")
                return { 
                    status: true,
                    message: 'Payment verified successfully' 
                };
            } else {
                console.log("Invalid payment signature")
                return { 
                    status: false,
                    message: 'Invalid payment signature' 
                };
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default RazorPayService;
