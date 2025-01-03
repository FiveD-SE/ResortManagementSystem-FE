import { IAccount } from './auth';

export interface ICustomer extends IAccount {
  customerId: string;
  name: string;
  phoneNumber?: string;
  address?: string;
}
