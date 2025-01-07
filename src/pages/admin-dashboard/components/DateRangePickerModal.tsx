import { Box, Button, Modal, Typography } from '@mui/material'
import { DateRange } from 'react-date-range';

interface DateRangePickerModalProps {
    open: boolean;
    onClose: () => void;
    selectedDateRange: { startDate: Date; endDate: Date; key: string; };
    setSelectedDateRange: (range: { startDate: Date; endDate: Date; key: string; }) => void;
    onConfirm: () => void;
}

const DateRangePickerModal = ({ onClose, open, selectedDateRange, setSelectedDateRange, onConfirm }: DateRangePickerModalProps) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'white.50', boxShadow: 24, padding: 4, borderRadius: 2 }}>
                <Typography variant='h4' sx={{ color: 'black.900', mb: 2 }}>
                    Select date range
                </Typography>
                <DateRange
                    ranges={[selectedDateRange]}
                    onChange={(ranges) => setSelectedDateRange(ranges.selection)}
                    displayMode="dateRange"
                    editableDateInputs={false}
                    moveRangeOnFirstSelection={false}
                    rangeColors={['#FF385C']}
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                    <Button sx={{ width: 100, fontSize: 14, fontWeight: 600, textTransform: 'none', padding: '4px 24px', bgcolor: 'white.50', color: '#5C5C5C', border: '1px solid #E0E0E0', ":hover": { borderColor: 'black.900' }, borderRadius: 2, ":disabled": { color: 'gray.200', bgcolor: 'gray.100' } }} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button sx={{ minWidth: 100, fontSize: 14, fontWeight: 600, textTransform: 'none', padding: '4px 24px', bgcolor: 'primary.500', color: 'white.50', border: '1px solid #FF385C', ":hover": { bgcolor: 'primary.600' }, borderRadius: 2, ":disabled": { color: 'gray.200', bgcolor: 'gray.100', borderColor: 'gray.100' } }} onClick={onConfirm}>
                        Export
                    </Button>
                </Box>
            </Box>
        </Modal >
    )
}

export default DateRangePickerModal