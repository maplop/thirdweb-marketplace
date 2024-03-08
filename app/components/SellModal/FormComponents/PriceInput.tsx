import TextField from "@mui/material/TextField";
import { styled } from "@mui/material";
import { ChangeEvent } from "react";

interface PriceInputProps {
  value: number,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const PriceInput = ({ value, onChange }: PriceInputProps) => {
  return (
    <PriceField
      variant="outlined"
      type="number"
      size="small"
      value={value}
      onChange={onChange}
      fullWidth
    />
  );
};

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
