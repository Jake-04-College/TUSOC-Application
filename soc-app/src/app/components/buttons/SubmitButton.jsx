"use client";

import { Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

export default function SubmitButton({ text, fullWidth = false, sx = {}, ...props }) {
  return (
    <Button
      variant="contained"
      startIcon={<SendIcon />}
      type="submit"
      fullWidth={fullWidth}
      sx={sx}
      {...props}
    >
      {text}
    </Button>
  );
}