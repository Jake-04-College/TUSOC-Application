"use client";

import React from "react";
import { FormControl, InputLabel, OutlinedInput, TextField, Checkbox, Container, Box, AppBar, Toolbar, InputAdornment, IconButton} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CssBaseline from "@mui/material/CssBaseline";
import { useRouter } from "next/navigation";

// Custom Imports
import SubmitButton from "../components/buttons/SubmitButton";
import RedirectButton from "../components/buttons/RedirectButton";
import ForgotPaswordButton from "./components/ForgotPasswordButton";


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
        const res = await fetch("http://localhost:3000/api/login", {
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

            <Container maxWidth="sm">
                <Box sx={{ height: "100%", mt: 2 }}>
                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <br></br>
                        <h2>
                            <center>Login to your Account</center>
                        </h2>
                        <br></br>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Email"
                            name="email"
                        />

                        <FormControl>
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

                        <SubmitButton text={"Login"}/>

                        <RedirectButton text={"Already have an account? Sign In"} link={"register"}/>

                        <ForgotPaswordButton/>
                    </Box>
                </Box>
            </Container>
        </>
    );
}
