import { Box, Modal } from '@mui/material'
import { DateCalendar, MonthCalendar } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import React from 'react'

interface CalendarModalProps {
    open: boolean;
    onClose: () => void;
    type?: string;
    onDateChange?: (newDate: dayjs.Dayjs) => void;
    onMonthChange?: (newMonth: dayjs.Dayjs) => void;
}

const CalendarModal = ({ open, onClose, type, onDateChange, onMonthChange }: CalendarModalProps) => {
    const [date, setDate] = React.useState(dayjs());
    const [month, setMonth] = React.useState(dayjs());

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'white.50',
                    boxShadow: 24,
                    padding: 2,
                    borderRadius: 2,
                }}
            >
                {type === 'monthly' ? (
                    <MonthCalendar
                        value={month}
                        onChange={(newMonth) => {
                            setMonth(newMonth);
                            onMonthChange?.(newMonth);
                        }}
                    />
                ) : (
                    <DateCalendar
                        value={date}
                        onChange={(newDate) => {
                            setDate(newDate);
                            onDateChange?.(newDate);
                        }}
                    />
                )}
            </Box>
        </Modal>
    );
};

export default CalendarModal