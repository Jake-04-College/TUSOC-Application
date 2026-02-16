"use client";

import { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, FormHelperText, TextField, Container, Box, Typography, Button } from "@mui/material";
import { LocalizationProvider, DateField } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { SubmitButton } from "../../components/buttons/buttons";

export default function OnboardingForm({ Username, UserEmail }) {
    const [courses, setCourses] = useState([]);
    const [submitError, setSubmitError] = useState("");

    const emailLocked = !!(UserEmail && UserEmail.trim());


    const { register, handleSubmit, formState: { errors, isSubmitting }, control, setValue } = useForm({
        defaultValues: {
            username: Username ?? "",
            email: UserEmail ?? "",
            password: "",
            dateOfBirth: null,
            studentNumber: "",
            courseCode: "",
            role: "User"
        },
    });

    useEffect(() => {
        async function fetchCourses() {
            const res = await fetch("/api/get/getCourses");
            const data = await res.json();
            setCourses(data);
        }
        fetchCourses();
    }, []);
    
    const router = useRouter();

    const onSubmit = async (data) => {
        setSubmitError("");

        // If email is locked, force it to the SSO email
        if (emailLocked) data.email = UserEmail;

        const res = await fetch("/api/post/onboard", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const msg = await res.json().catch(() => null);
            setSubmitError(msg?.error || "Failed to submit onboarding.");
            return
        }

        router.push("/home")
        router.refresh();

    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ height: "100%", mt: 2 }}>
                <Box
                    sx={{
                        p: 2,
                        borderRadius: 2,
                        boxShadow: "8px 8px 16px rgba(0, 0, 0, 0.25)",
                        backgroundColor: "background.paper",
                    }}
                >
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>


                        {submitError ? (
                            <Typography sx={{ mt: 1 }} color="error">
                                {submitError}
                            </Typography>
                        ) : null}

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Username"
                            type="text"
                            {...register("username", {
                                required: "Username is required",
                                minLength: { value: 3, message: "Username must be at least 3 characters" },
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
                            disabled={emailLocked}
                            {...register("email", {
                                required: "Email is required",
                                pattern: { value: /^\S+@\S+$/i, message: "Please enter a valid email address" },
                            })}
                            error={!!errors.email}
                            helperText={
                                errors.email
                                    ? errors.email.message
                                    : emailLocked
                                        ? "Email cannot be changed"
                                        : ""
                            }
                        />

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
                                    message: "Student number must be like B00000000 or C00000000",
                                },
                            })}
                            error={!!errors.studentNumber}
                            helperText={errors.studentNumber ? errors.studentNumber.message : ""}
                        />

                        <FormControl fullWidth error={!!errors.courseCode} margin="normal">
                            <InputLabel id="courseCode-label">Course</InputLabel>

                            <Controller
                                name="courseCode"
                                control={control}
                                rules={{ required: "Course Code is required" }}
                                render={({ field }) => (
                                    <Select
                                        labelId="courseCode-label"
                                        label="Course"
                                        value={field.value}
                                        onChange={field.onChange}
                                    >
                                        {courses.map((course) => (
                                            <MenuItem key={course.courseCode} value={course.courseCode}>
                                                {course.courseCode} - {course.courseName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />

                            <FormHelperText>{errors.courseCode?.message}</FormHelperText>
                        </FormControl>

                        <input type="hidden" {...register("role")} />

                        <Box sx={{ mt: 3 }}>
                            <Box sx={{ mt: 3 }}>
                                <SubmitButton
                                    text={isSubmitting ? "Submitting..." : "Complete Onboarding"}
                                    fullWidth
                                    disabled={isSubmitting}
                                />
                            </Box>

                        </Box>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}
