"use client";

import { Button } from "@mui/material";
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { login } from "../../../lib/actions/authactions"
import SendIcon from '@mui/icons-material/Send';

export function LoginButton() {
    const router = useRouter();
    return (
        <Button
            variant="contained"
            endIcon={<TrendingFlatIcon />}
            onClick={() => router.push("/login")}
        >
            {"Login with Existing Credentials"}
        </Button>
    );
}

export function LogoutButton() {
    const router = useRouter()
    return (
        <Button
            variant="contained"
            endIcon={<TrendingFlatIcon />}
            onClick={async () => {
                await signOut({ redirect: false });
                router.refresh();
            }}
        >
            {"Logout"}
        </Button>

    );
}

export function RedirectButton({ text, link }) {
    const router = useRouter();

    return (
        <Button
            variant="contained"
            endIcon={<TrendingFlatIcon />}
            onClick={() => router.push(link.startsWith("/") ? link : `/${link}`)}

        >
            {text}
        </Button>
    );
}

export function SSOLoginButton(provider) {
    return (
        <Button
            variant="contained"
            endIcon={<TrendingFlatIcon />}
            onClick={() => login(provider)}
        >
            {"Sign in with SSO"}
        </Button>
    );
}

export function SubmitButton({ text, fullWidth = false, sx = {}, ...props }) {
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




