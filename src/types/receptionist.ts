import { IAccount } from './auth';

export interface IReceptionist extends IAccount {
  receptionistId: string;
  name: string;
}
