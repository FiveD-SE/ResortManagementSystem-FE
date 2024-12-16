export interface IService {
  serviceId: string;
  serviceName: string;
  description: string | null;
  serviceTypeId: string;
  price: number;
}

export interface IServiceType {
  serviceTypeId: string;
  typeName: string;
  description: string | null;
}
