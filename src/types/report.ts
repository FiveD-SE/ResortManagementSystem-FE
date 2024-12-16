import { ReportType } from './enums';

export interface IReport {
  reportId: string;
  reportType: ReportType;
  startDate: Date;
  endDate: Date;
  generatedBy: string;
}
