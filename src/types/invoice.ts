import { PaymentStatus } from './enums';

export interface IInvoice {
  invoiceId: string;
  customerId: string;
  totalAmount: number;
  issuedDate: Date;
  paymentStatus: PaymentStatus;
  bookingId: string;
}
