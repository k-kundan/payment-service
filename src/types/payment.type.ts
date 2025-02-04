export interface Order {
    amount: number;
    currency: string;
    notes: Object;
    partial_payment: false;
    vendorId: string
}