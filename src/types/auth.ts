import { Role } from './enums';

export interface IAccount {
  id: string;
  name: string;
  password: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  status: string;
}
