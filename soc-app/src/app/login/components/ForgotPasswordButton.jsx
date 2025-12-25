"use client";

import Button from '@mui/material/Button';
import LockResetIcon from '@mui/icons-material/LockReset';
import { redirect } from 'next/navigation';

/*
    @Params: text - Text to display on the button
    Component the renders a page with a pre-defined Forgot Password button using MUI components.
*/

export default function ForgotPasswordButton() {
  return (
    <Button variant="contained" startIcon={<LockResetIcon />} onClick={() => redirect('/forgot-password')}>
      Forgot Password
    </Button>
  );
}