export enum RoomStatus {
  Available = 'Available',
  Occupied = 'Occupied',
  Under_Maintenance = 'Under Maintenance',
}

export enum PaymentStatus {
  Pending = 'Pending',
  Paid = 'Paid',
}

export enum BookingStatus {
  Pending = 'pending',
  CheckedIn = 'Checked in',
  CheckedOut = 'Checked out',
}

export enum ReportType {
  Revenue = 'Revenue',
  ServicePerformance = 'Service Performance',
  RoomOccupancy = 'Room Occupancy',
}

export enum Role {
  User = 'user',
  Admin = 'admin',
  Receptionist = 'receptionist',
  ServiceStaff = 'service_staff',
}

export enum UserSortBy {
  FirstName = 'firstName',
  LastName = 'lastName',
  IsActive = 'isActive',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
}

export enum PaymentMethod {
  PayOnArrival = 'Pay on arrival',
  Transfer = 'Transfer',
}
