import { IAccount } from './auth';

export interface IAdministrator extends IAccount {
  administratorId: string;
  name: string;
}
