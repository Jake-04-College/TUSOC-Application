"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { AppBar, Box, Container, CssBaseline, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Select, TextField, Toolbar, MenuItem, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LocalizationProvider, DateField } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";



// Custom Components
import RedirectButton from "../components/buttons/RedirectButton.jsx";
import SubmitButton from "../components/buttons/SubmitButton.jsx";


// Theme Import
// import theme from ....

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
            const res = await fetch("/api/getCourses");
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
            <AppBar position="static">
                <Toolbar></Toolbar>
            </AppBar>
            <Box sx={{ minHeight: "100vh", background: "linear-gradient(180deg, #2a68b9ff 0%, #ffffff 100%)", py: 4 }}>


            <Container maxWidth="sm">
                <Box sx={{ height: "100%", mt: 2 }}>
                    <Box sx={{ p: 1, borderRadius: 2, boxShadow: "8px 8px 16px rgba(0, 0, 0, 0.68)", backgroundColor: "background.paper" }}>
                        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                            <Box sx={{ mb: 1, pl: 0.5 }}>
                                <Typography variant="h3" sx={{ fontWeight: 800, textAlign: "left" }}>
                                    Create Account.
                                </Typography>
                                <Typography variant="subtitle1" sx={{ fontWeight: 500, textAlign: "left", mt: 0.5 }}>
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
                                    <MenuItem key={course.courseCode} value ={course.courseCode}>
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

                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 2 }}>
                            <RedirectButton text="Already have an account? Login" link="login" />
                        </Box>
                        </Box>
                    </Box>
                </Box>
                
            </Container>
            </Box>
        </>
    );
}