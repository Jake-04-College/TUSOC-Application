"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { Box, Container, CssBaseline, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Select, TextField, MenuItem, Typography, Link as MuiLink } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LocalizationProvider, DateField } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Link from "next/link";

// Custom Components
import { SubmitButton, SSOLoginButton } from "../components/buttons/buttons";
import NavBar from "../components/navbar/Navbar";

export default function RegisterPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control
    } = useForm();

    const [courses, setCourses] = useState([]);

    const handleChange = (event) => {
        setCourses(event.target.value);
    };

    useEffect(() => {
        async function fetchCourses() {
            const res = await fetch("/api/get/getCourses");
            const data = await res.json();
            setCourses(data);
        }
        fetchCourses();
    }, []);

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
        const res = await fetch("/api/auth/register", {
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
            <NavBar />

            <Container maxWidth="sm">
                <Box sx={{ minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", py: 4 }}>
                    <Box sx={{ p: 2, borderRadius: 2, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", backgroundColor: "background.paper" }}>
                            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                                <Box sx={{ mb: 2, pl: 0.5 }}>
                                    <Typography variant="h4" sx={{ fontWeight: 800, textAlign: "left" }}>
                                        Create Account.
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 500, textAlign: "left", mt: 0.5, color: "text.secondary" }}>
                                        Please enter your details.
                                    </Typography>
                                </Box>

                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
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

                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
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

                                <FormControl error={!!errors.password} margin="normal" fullWidth>
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




                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Controller
                                        name="dateOfBirth"
                                        control={control}
                                        rules={{ required: "Date of birth is required" }}
                                        render={({ field, fieldState }) => (
                                            <DateField
                                                {...field}
                                                label="Date of Birth"
                                                format="DD/MM/YYYY"
                                                value={field.value}
                                                onChange={(newValue) => field.onChange(newValue)}
                                                error={!!fieldState.error}
                                                helperText={fieldState.error?.message}
                                                margin="normal"
                                                fullWidth
                                            />
                                        )}
                                    />
                                </LocalizationProvider>

                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
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
                                <FormControl fullWidth error={!!errors.courseCode} margin="normal">
                                    <InputLabel id="courseCode-label">Course</InputLabel>

                                    <Select
                                        labelId="courseCode-label"
                                        label="Course"
                                        defaultValue=""
                                        {...register("courseCode", {
                                            required: "Course Code is required",
                                        })}
                                    >

                                        {courses.map((course) => (
                                            <MenuItem key={course.courseCode} value={course.courseCode}>
                                                {course.courseCode} - {course.courseName}
                                            </MenuItem>
                                        ))}
                                    </Select>

                                    <FormHelperText>
                                        {errors.courseCode?.message}
                                    </FormHelperText>
                                </FormControl>

                                <Box sx={{ mt: 3 }}>
                                    <SubmitButton text="Sign Up" fullWidth />
                                </Box>

                                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, justifyContent: "center", alignItems: "center", mt: 3 }}>
                                    <Typography variant="body2" sx={{ textAlign: "center" }}>
                                        Already have an account? 
                                        <MuiLink
                                            component={Link}
                                            href="/login"
                                            underline="hover"
                                            sx={{ fontWeight: 600, ml: 0.5 }}
                                        >
                                            Login here
                                        </MuiLink>
                                    </Typography>
                                    <SSOLoginButton />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
            </Container>
        </>
    );
}