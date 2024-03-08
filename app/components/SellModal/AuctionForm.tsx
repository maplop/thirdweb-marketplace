import { MARKETPLACE_ADDRESS } from "@/const/address"
import { Box, InputLabel, TextField, styled } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DemoItem } from "@mui/x-date-pickers/internals/demo"
import { Web3Button } from "@thirdweb-dev/react"
import dayjs from "dayjs"

const AuctionFrom: React.FC = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Content>
        <DemoItem label="Listing starts on:">
          <DateInput defaultValue={dayjs('2022-04-17')} />
        </DemoItem>
        <DemoItem label="Listing ends on:">
          <DateInput defaultValue={dayjs('2022-04-17')} />
        </DemoItem>
        <Box>
          <Label>Price</Label>
          <PriceField variant="outlined" type="number" placeholder="" size="small" fullWidth />
        </Box>
        <Web3Button
          contractAddress={MARKETPLACE_ADDRESS}
          action={() => null}
          style={{ marginTop: '10px' }}

        >Create Auction Listing</Web3Button>
      </Content>
    </LocalizationProvider>
  )
}
export default AuctionFrom

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

