import { Role } from './enums';

export interface IAccount {
  id: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  avatar: string;
  phoneNumber: string;
}
