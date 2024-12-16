import { Role } from './enums';

export interface IAccount {
  accountId: string;
  username: string;
  password: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  status: string;
}
