"use client";

import { Button } from "@mui/material";
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { useRouter } from "next/navigation";
import SendIcon from '@mui/icons-material/Send';
import { signIn, signOut } from "next-auth/react";

export function LoginButton({ fullWidth = false, sx = {}, ...props } = {}) {
    const router = useRouter();
    return (
        <Button
            variant="contained"
            endIcon={<TrendingFlatIcon />}
            onClick={() => router.push("/login")}
            fullWidth={fullWidth}
            sx={sx}
            {...props}
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

export function RedirectButton({ text, link, onClick, fullWidth = false, sx = {}, ...props }) {
    const router = useRouter();

    return (
        <Button
            variant="contained"
            endIcon={<TrendingFlatIcon />}
            onClick={(e) => {
                onClick?.(e);
                if (e.defaultPrevented) return;
                router.push(link.startsWith("/") ? link : `/${link}`);
            }}
            fullWidth={fullWidth}
            sx={sx}
            {...props}

        >
            {text}
        </Button>
    );
}

export function SSOLoginButton({ provider = null, fullWidth = false, sx = {}, ...props } = {}) {
    return (
        <Button
            variant="contained"
            endIcon={<TrendingFlatIcon />}
        onClick={() => (provider ? signIn(provider, { callbackUrl: "/home" }) : signIn())}
            fullWidth={fullWidth}
            sx={sx}
            {...props}
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




