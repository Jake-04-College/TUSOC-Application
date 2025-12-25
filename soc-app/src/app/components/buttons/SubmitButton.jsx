"use client";

import { Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

export default function SubmitButton({ text }) {

  return (
    <Button
      variant="contained"
      startIcon={<SendIcon />}
      type="submit"
    >
      {text}
    </Button>
  );
}