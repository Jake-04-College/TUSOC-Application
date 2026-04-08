"use client";

import React from "react";
import { FormControl, InputLabel, OutlinedInput, TextField, Checkbox, Container, Box, AppBar, Toolbar, InputAdornment, IconButton, Link as MuiLink, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CssBaseline from "@mui/material/CssBaseline";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

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
        const cleanEmail = String(email || "").trim().toLowerCase();
        const cleanPassword = String(pass || "");

        if (!cleanEmail || !cleanPassword) {
            console.log("Email and password are required");
            return;
        }

        const result = await signIn("credentials", {
            email: cleanEmail,
            password: cleanPassword,
            redirect: false,
            callbackUrl: "/home",
        });

        if (result?.ok) {
            console.log("login is valid!");
<<<<<<< Updated upstream
            router.push("/home");
            router.refresh();
=======
            console.log("User found:", data);
            router.push("/home");
>>>>>>> Stashed changes

        } else {
            console.log("not valid");
            console.log("Login error:", result?.error);

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

<<<<<<< Updated upstream
            <Box sx={{ minHeight: "100vh", background: "background.paper", py: 4 }}>
=======
            <Box
                sx={{
                    minHeight: "95vh",
                    background: "linear-gradient(135deg, #1b3a7a 0%, #2a68b9 45%, #5aa3e8 100%)",
                    py: { xs: 3, sm: 4 },
                }}  
            >
>>>>>>> Stashed changes
            <Container maxWidth="sm">
                <Box sx={{ height: "100%", mt: { xs: 1, sm: 2 } }}>
                    <Box
                        sx={{
                            p: { xs: 2.5, sm: 3.5 },
                            borderRadius: 3,
                            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.35)",
                            backgroundColor: "rgba(255, 255, 255, 0.95)",
                            backdropFilter: "blur(6px)",
                            border: "1px solid rgba(255, 255, 255, 0.6)",
                        }}
                    >
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
                            autoComplete="email"
                        />

                        <FormControl margin="normal" fullWidth>
                            <InputLabel>Password</InputLabel>
                            <OutlinedInput
                                id="password"
                                name="pass"
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                name="pass"
                                autoComplete="current-password"

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

<<<<<<< Updated upstream
                        <Box sx={{ mt: 3 }}>
                            <SSOLoginButton />
                        </Box>

                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 23, mt: 2, fontSize: "0.9rem", pt: 25 }}>
=======
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 21, mt: 2, fontSize: "0.9rem", pt: 25 }}>
>>>>>>> Stashed changes
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.2       }}>
                                <span>Don't have an account?</span>
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
