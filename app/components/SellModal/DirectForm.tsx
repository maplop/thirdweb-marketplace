
import { Box, InputLabel, TextField, styled } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { Web3Button } from "@thirdweb-dev/react";
import { MARKETPLACE_ADDRESS } from "@/const/address";
import { DatePickerInput } from "./FormComponents/DatePickerInput";
import { ChangeEvent, useState } from "react";
import { DateTime } from "luxon";
import { PriceInput } from "./FormComponents/PriceInput";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
interface DirectFromProps {
  nftId?: string
}

const DirectFrom: React.FC<DirectFromProps> = ({ nftId }) => {

  const date = DateTime.DATE_SHORT

  const today = DateTime.now()
  const [startDate, setStartDate] = useState<DateTime | null>(today)

  const handleStartDateOnChange = (newDate: DateTime) => {
    setStartDate(newDate)
  }

  const nextMonth = today.plus({ months: 1 });
  const [endDate, setEndDate] = useState<DateTime | null>(nextMonth)

  const handleEndDateOnChange = (newDate: DateTime | null) => {
    setEndDate(newDate)
  }

  const [price, setPrice] = useState<number>(0)

  const handlePriceOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(event.target.value))
  }

  console.log("$$$$$$$$$$$$$$$$")
  console.log(startDate?.toISO())
  console.log(endDate?.toISO())
  console.log(price)

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <Content>
        {/*
        <DatePickerInput
          label="Listing starts on"
          value={startDate}
          onChangeDate={(date: DateTime | null) => setStartDate(date)}
        />
        <DatePickerInput
          label="Listing ends on"
          value={endDate}
          onChangeDate={(date: DateTime | null) => setEndDate(date)}
        />
        */}
        <DatePickerContainer label="Listing ends on">
          <DatePicker
            value={startDate}
            onChange={(newDate: DateTime | null) => setStartDate(newDate)}
            format="dd/MM/yyyy"
          />
        </DatePickerContainer>
        <DatePickerContainer label="Listing ends on">
          <DatePicker
            value={endDate}
            onChange={(newDate: DateTime | null) => setEndDate(newDate)}
            format="dd/MM/yyyy"
            className="date-picker"
          />
        </DatePickerContainer>
        <Box>
          <Label>Price</Label>
          <PriceInput
            value={price}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setPrice(Number(event.target.value))}
          />
        </Box>
        <Web3Button
          contractAddress={MARKETPLACE_ADDRESS}
          action={() => null}
          /*action={async () => {
            await handleSubmitDirect(handleSubmissionDirect)()
          }}*/
          onSuccess={() => {
            console.log("$$$$$  success #####")
          }
          }
          style={{ marginTop: '10px' }}

        >Create Direct Listing</Web3Button>
      </Content>
    </LocalizationProvider >
  )
}
export default DirectFrom

const Content = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',

  p: {
    color: theme.palette.secondary.light,
    fontSize: "12px"
  },

  svg: {
    color: theme.palette.secondary.contrastText,
  }
}))

const DatePickerContainer = styled(DemoItem)(({ }) => ({

  '& < .date-picker': {
    background: 'red'
  }

}))

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

const Label = styled(InputLabel)(({ theme }) => ({
  fontSize: '12px',
  fontWeight: 400,
  color: theme.palette.secondary.light,
}))

const PriceField = styled(TextField)(({ theme }) => ({

  input: {
    paddingTop: '6px',
    paddingBottom: '6px',
    color: theme.palette.secondary.contrastText,
  },

  fieldset: {
    borderColor: theme.palette.secondary.dark,
  },
}))
