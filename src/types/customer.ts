import { IAccount } from './auth';

export interface ICustomer extends IAccount {
  customerId: string;
  name: string;
  phone?: string;
  address?: string;
}
