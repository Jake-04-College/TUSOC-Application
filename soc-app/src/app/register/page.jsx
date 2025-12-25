"use client";
import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { DateField } from "@mui/x-date-pickers/DateField";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField, IconButton, InputLabel, OutlinedInput, FormHelperText, InputAdornment, FormControl } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CssBaseline from "@mui/material/CssBaseline";


// Custom Components
import RedirectButton from "../components/buttons/RedirectButton.jsx";
import SubmitButton from "../components/buttons/SubmitButton.jsx";
import { LocalizationProvider } from "@mui/x-date-pickers";


// Theme Import
// import theme from ....

export default function RegisterPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const router = useRouter();

    // ================= Password Visibility Toggle =================
    // https://mui.com/material-ui/react-text-field/#InputAdornments.js

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // ===============================================================

    const onSubmit = async (data) => {
        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (res.ok) {
            router.push("/login");
        } else {
            console.error("Registration failed");
        }
    };




    return (
        <>
        <CssBaseline />
            <AppBar position="static">
                <Toolbar></Toolbar>
            </AppBar>

            <Container maxWidth="sm">
                <Box sx={{ height: "100%", mt: 2 }}>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                        <br />
                        <h2 style={{ textAlign: "center" }}>Create a New Account</h2>
                        <br />


                        <TextField
                            label="Username"
                            type="text"
                            {...register("username", {
                                required: "Username is required",
                                minLength: {
                                    value: 3,
                                    message: "Username must be at least 3 characters"
                                }
                            })}
                            error={!!errors.username}
                            helperText={errors.username ? errors.username.message : ""}
                        />

                        <br />

                        <TextField
                            label="Email Address"
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Please enter a valid email address"
                                }
                            })}
                            error={!!errors.email}
                            helperText={errors.email ? errors.email.message : ""}
                        />
                        <br />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateField
                                label="Date of Birth"
                                type="date"
                                format="DD/MM/YYYY"
                                {...register("dateOfBirth", {
                                    required: "Date of birth is required",
                                })}
                                error={!!errors.dateOfBirth}
                                helperText={errors.dateOfBirth ? errors.dateOfBirth.message : ""}
                            />
                        </LocalizationProvider>
                        <br />

                        <TextField
                            label="Student Number"
                            type="text"
                            {...register("studentNumber", {
                                required: "Student number is required",
                                pattern: {
                                    value: /^[BC]\d{8}$/i,
                                    message: "Student number must be like B00000000 or C00000000"
                                }
                            })}
                            error={!!errors.studentNumber}
                            helperText={errors.studentNumber ? errors.studentNumber.message : ""}
                        />
                        <br />

                        <FormControl error={!!errors.password}>
                            <InputLabel>Password</InputLabel>
                            <OutlinedInput
                                id="password"
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message: "Password must be at least 8 characters",
                                    },
                                })}
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
                            <FormHelperText>
                                {errors.password?.message}
                            </FormHelperText>
                        </FormControl>
                        <br />
                        <br />
                        <SubmitButton text="Sign Up" />
                        <br />
                        <RedirectButton text="Already have an account? Login" link="login" />
                    </Box>
                </Box>
            </Container>
        </>
    );
}