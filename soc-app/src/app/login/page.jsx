"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useRouter } from "next/navigation";

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

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            name="pass"
                        />

                        <FormControlLabel control={<Checkbox />} label="Remember me" />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3 }}
                        >
                            Sign In
                        </Button>

                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3 }}
                            onClick={() => router.push("/register")}
                        >
                            Don't have an account? Sign Up
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>
    );
}
