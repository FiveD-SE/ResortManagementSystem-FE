# Resort Management System (RMS)

## Overview

The **Resort Management System (RMS)** is a comprehensive software solution designed to streamline resort operations, from guest services to administrative tasks. RMS offers an integrated, web-based platform accessible from desktops, tablets, and mobile devices, making it a scalable and adaptable solution for resorts of all sizes.

## Features

### 1. **Reservation Management**
- **Guest functionality**: Search available rooms, book, modify, or cancel reservations.
- **Staff functionality**: View, update, or cancel reservations; confirm bookings manually or online.
- **Automated notifications**: Confirmation emails for successful bookings.
  
### 2. **Guest Check-in and Check-out**
- **Effortless processes**: Self-check-in options for guests, manual check-in for staff.
- **Streamlined payments**: Automated calculation of outstanding charges and invoice generation.

### 3. **Room and Housekeeping Management**
- **Dynamic schedules**: Manage room availability and housekeeping tasks based on check-ins and check-outs.
- **Guest requests**: Guests can request additional housekeeping services via the portal.

### 4. **Billing and Payment Management**
- **Integrated gateways**: Supports multiple payment methods.
- **Detailed invoicing**: Generates and stores invoices for all transactions.
- **Transparency**: Guests can view their billing history.

### 5. **Reporting and Analytics**
- **Operational insights**: Generate occupancy, revenue, and guest demographic reports.
- **Visual analytics**: Utilize charts and graphs to analyze performance.

### 6. **Employee Management**
- **Secure data**: Store and update employee information with controlled access.
- **Scheduling**: Manage and report on employee schedules.

### 7. **Financial Management**
- **Profit tracking**: Monitor revenues and operating costs.
- **Detailed reports**: Daily, weekly, monthly, and yearly financial analytics.

### 8. **Guest Management**
- **Comprehensive records**: Track guest stay history and feedback securely.

### 9. **Service Management**
- **Service logs**: Track guest services like restaurants and spa visits.
- **Availability updates**: Real-time updates on service availability and special offers.

---

## Operating Environment

- **Browsers**: Chrome.
- **Database**: Cloud-based MongoDB for secure data storage.
- **Third-party integrations**: Online booking platforms, payment gateways (PayOS), and email services (Mailjs).

## Technology Stack

- **Backend**: Node.js
- **Frontend**: ReactJS
- **Database**: MongoDB
- **Hosting**: Railway

## Design Constraints

1. **Compliance**: GDPR, PCI-DSS, and other regulatory standards.
2. **Performance**: Handle high user loads with no degradation.
3. **Scalability**: Support single and multi-property resorts.
4. **Security**: Strong access control and data protection measures.

## Assumptions and Dependencies

- **Internet connectivity**: Reliable internet access is required for operations.
- **Third-party systems**: Booking platforms and payment gateways must be functional.
- **User training**: Resort staff will be trained to use the system efficiently.

## Functional Requirements Highlights

- **Reservation Management**: Real-time room availability updates and booking confirmations.
- **Check-in/Check-out**: Support for both manual and self-service options.
- **Housekeeping Management**: Automated task scheduling and service requests.
- **Billing**: Transparent payment processing with support for multiple payment methods.
- **Reporting**: Scheduled and on-demand generation of performance metrics.

## License

This project is licensed under the [MIT License](LICENSE).
