"use client";

import React from "react";
import { FormControl, InputLabel, OutlinedInput, TextField, Checkbox, Container, Box, AppBar, Toolbar, InputAdornment, IconButton, Link as MuiLink, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CssBaseline from "@mui/material/CssBaseline";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Custom Imports
import { SubmitButton, SSOLoginButton } from '../components/buttons/buttons'


export default function LoginPage() {

    const handleSubmit = (event) => {
        console.log("handling submit");

        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get("email");
        const pass = data.get("pass");

        runDBCallAsync(email, pass);
    }; // end handler

    async function runDBCallAsync(email, pass) {
        const res = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password: pass }),
        });

        const data = await res.json();

        if (data.valid) {
            console.log("login is valid!");
            console.log("User found:", data);

        } else {
            console.log("not valid");
            console.log("User found:", data);

        }
    }


    const router = useRouter();

        // ================= Password Visibility Toggle =================
        // https://mui.com/material-ui/react-text-field/#InputAdornments.js
    
        const [showPassword, setShowPassword] = React.useState(false);
    
        const handleClickShowPassword = () => setShowPassword((show) => !show);
    
        const handleMouseDownPassword = (event) => {
            event.preventDefault();
        };
    
        // ===============================================================
    

    return (
        <>
            <CssBaseline />

            <AppBar position="static">
                <Toolbar></Toolbar>
            </AppBar>

            <Box sx={{ minHeight: "100vh", background: "background.paper", py: 4 }}>
            <Container maxWidth="sm">
                <Box sx={{ height: "100%", mt: 2 }}>
                    <Box sx={{ p: 1, borderRadius: 2, boxShadow: "8px 8px 16px rgba(0, 0, 0, 0.68)", backgroundColor: "background.paper", height: "700" }}>
                        <Box component="form" onSubmit={handleSubmit} noValidate>
                            <Box sx={{ mb: 1, pl: 0.5 }}>
                                <Typography variant="h3" sx={{ fontWeight: 800, textAlign: "left" }}>
                                    Welcome Back.
                                </Typography>
                                <Typography variant="subtitle1" sx={{ fontWeight: 500, textAlign: "left", mt: 0.5 }}>
                                    Please enter your details.
                                </Typography>
                            </Box>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Email"
                            name="email"
                        />

                        <FormControl margin="normal" fullWidth>
                            <InputLabel>Password</InputLabel>
                            <OutlinedInput
                                id="password"
                                label="Password"
                                type={showPassword ? "text" : "password"}

                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <br></br>

                        <Box sx={{ mt: 3 }}>
                            <SubmitButton text={"Login"} fullWidth />
                        </Box>

                        <Box sx={{ mt: 3 }}>
                            <SSOLoginButton />
                        </Box>

                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 23, mt: 2, fontSize: "0.9rem", pt: 25 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.2       }}>
                                <span>Don't have an account? </span>
                                <MuiLink
                                    component={Link}
                                    href="/register"
                                    underline="hover"
                                    sx={{ fontWeight: 600 }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        router.push("/register");
                                    }}
                                >
                                     Sign up
                                </MuiLink>
                            </Box>
                            <MuiLink
                                component={Link}
                                href="/forgot-password"
                                underline="hover"
                                sx={{ fontWeight: 600 }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    router.push("/forgot-password");
                                }}
                            >
                                Forgot password?
                            </MuiLink>
                        </Box>
                        </Box>
                    </Box>
                </Box>
            </Container>
            </Box>
        </>
    );
}
