import { IAccount } from './auth';

export interface serviceStaff extends IAccount {
  staffId: string;
  name: string;
  serviceTypeId: string
}
