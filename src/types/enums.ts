export enum RoomStatus {
  Available = 'Available',
  Booked = 'Booked',
  Maintenance = 'Maintenance',
  UnderRepair = 'UnderRepair',
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
  Staff = 'staff',
  Receptionist = 'receptionist',
  ServiceStaff = 'service_staff',
}
