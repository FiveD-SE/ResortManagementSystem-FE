import { IAccount } from './auth';

export interface ServiceStaff extends IAccount {
  staffId: string;
  name: string;
  serviceType: string;
}
