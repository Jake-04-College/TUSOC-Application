"use client";

import React from "react";
import { FormControl, InputLabel, OutlinedInput, TextField, Container, Box, InputAdornment, IconButton, Link as MuiLink, Typography, CssBaseline } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

// Custom Imports
import { SubmitButton, SSOLoginButton } from '../components/buttons/buttons';
import NavBar from '../components/navbar/Navbar';


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
            router.push("/home");
            router.refresh();
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
            <NavBar />

            <Container maxWidth="sm">
                <Box sx={{ minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", py: 4 }}>
                    <Box sx={{ p: 2, borderRadius: 2, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", backgroundColor: "background.paper" }}>
                        <Box component="form" onSubmit={handleSubmit} noValidate>
                            <Box sx={{ mb: 2, pl: 0.5 }}>
                                <Typography variant="h4" sx={{ fontWeight: 800, textAlign: "left" }}>
                                    Welcome Back.
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 500, textAlign: "left", mt: 0.5, color: "text.secondary" }}>
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

                        <Box sx={{ mt: 3 }}>
                            <SSOLoginButton />
                        </Box>

                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 23, mt: 2, fontSize: "0.9rem", pt: 25 }}>
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
                           
                        </Box>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </>
    );
}
