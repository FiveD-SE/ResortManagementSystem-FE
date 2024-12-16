export interface IVerificationCode {
  codeId: string;
  code: string;
  email: string;
  createdAt: Date;
  expiresAt: Date;
}
