declare module 'react-date-range' {
    import { ReactNode } from 'react';

    interface Range {
        startDate: Date;
        endDate: Date;
        key: string;
    }

    interface CommonDateRangeProps {
        ranges: Array<Range>;
        onChange: (ranges: { selection: Range }) => void;
        showSelectionPreview?: boolean;
        moveRangeOnFirstSelection?: boolean;
        months?: number;
        direction?: 'horizontal' | 'vertical';
        rangeColors?: string[];
        editableDateInputs?: boolean;
        focusedRange?: [number, number];
        initialFocusedRange?: [number, number];
    }

    export interface DateRangePickerProps extends CommonDateRangeProps {
        staticRanges?: ReactNode[];
        inputRanges?: ReactNode[];
    }

    export const DateRangePicker: React.ComponentType<DateRangePickerProps>;

    export interface DateRangeProps extends CommonDateRangeProps {
        displayMode?: 'dateRange' | 'date';
        minDate?: Date;
        maxDate?: Date;
        weekdayDisplayFormat?: string;
    }

    export const DateRange: React.ComponentType<DateRangeProps>;

    export default DateRangePicker;
}
