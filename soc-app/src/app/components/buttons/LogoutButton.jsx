"use client";

import { Button } from "@mui/material";
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { logout } from "../../../lib/actions/authactions";

/*
    @Params: text - Text to display on the button
    @Params: link - Link to redirect to on click
    Component the renders a page with a pre-defined Forgot Password button using MUI components.
*/

export default function LoginButton() {
    return (
        <Button
            variant="contained"
            endIcon={<TrendingFlatIcon />}
            onClick={() => logout()}
        >
            {"Logout"}
        </Button>
    );
}
