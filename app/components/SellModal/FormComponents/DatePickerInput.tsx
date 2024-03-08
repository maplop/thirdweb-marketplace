import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { styled } from "@mui/material";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { DateTime } from "luxon";
import { DateValidationError, PickerChangeHandlerContext } from "@mui/x-date-pickers";

interface DatePickerInputProps {
  label: string
  value: DateTime | null
  onChangeDate: (newValue: DateTime | null, context: PickerChangeHandlerContext<DateValidationError>) => void;
}

export const DatePickerInput = ({ label, value, onChangeDate }: DatePickerInputProps) => {

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <DemoItem label={label}>
        <DateInput
          value={value}
          onChange={onChangeDate}
          format="dd/MM/yyyy"
        />
      </DemoItem>
    </LocalizationProvider>
  );
};

const DateInput = styled(DatePicker)(({ theme }) => ({

  '&.MuiFormControl-root': {
    marginTop: '2px'
  },

  input: {
    paddingTop: '6px',
    paddingBottom: '6px',
    color: theme.palette.secondary.contrastText,
  },

  fieldset: {
    borderColor: theme.palette.secondary.dark,
  },
}))
