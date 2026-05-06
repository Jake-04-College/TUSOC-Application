"use client";

import * as React from "react";
import { Alert, Box, Container, CssBaseline, Typography } from "@mui/material";
import NavBar from "../components/navbar/Navbar";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function PostPage() {
    const router = useRouter();
    const { status } = useSession();

    const [societies, setSocieties] = React.useState([]);
    const [isLoadingSocieties, setIsLoadingSocieties] = React.useState(true);
    const [selectedSocietyId, setSelectedSocietyId] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [bodyText, setBodyText] = React.useState("");
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [formError, setFormError] = React.useState("");
    const [formSuccess, setFormSuccess] = React.useState("");
    const [selectedImage, setSelectedImage] = React.useState(null);

    React.useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    React.useEffect(() => {
        async function fetchSocieties() {
            try {
                const res = await fetch("/api/get/getSocietys");
                if (!res.ok) throw new Error("Failed to load societies");
                const data = await res.json();
                const safeData = Array.isArray(data) ? data : [];
                setSocieties(safeData);
                if (safeData.length > 0) {
                    setSelectedSocietyId(String(safeData[0]._id));
                }
            } catch (error) {
                console.error("Failed to fetch societies", error);
                setSocieties([]);
                setFormError("Failed to load societies.");
            } finally {
                setIsLoadingSocieties(false);
            }
        }

        fetchSocieties();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFormError("");
        setFormSuccess("");

        if (!selectedSocietyId) {
            setFormError("Please select a society.");
            return;
        }

        if (!title.trim()) {
            setFormError("Please enter a title.");
            return;
        }

        if (!bodyText.trim()) {
            setFormError("Please enter post content.");
            return;
        }

        const selectedSociety = societies.find((soc) => String(soc._id) === selectedSocietyId);

        setIsSubmitting(true);
        try {
            let imageUrl = "";

            if (selectedImage) {
                const formData = new FormData();
                formData.append("image", selectedImage);

                const imageUploadRes = await fetch("/api/cloudinary", {method: "POST", body: formData});

                const imageUploadData = await imageUploadRes.json();

                if (!imageUploadRes.ok) { throw new Error(imageUploadData?.error || "Image upload failed"); }

                imageUrl = imageUploadData.imageUrl || "";
            }

            const res = await fetch("/api/post/createPost", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    societyId: selectedSocietyId,
                    societyName: selectedSociety?.Soc_Name || "",
                    title: title.trim(),
                    body: bodyText.trim(),
                    imageUrl,
                }),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data?.error || "Failed to create post");
            }

            setFormSuccess("Post created successfully.");
            setTitle("");
            setBodyText("");
            setSelectedImage(null);
            router.push("/home");
        } catch (error) {
            setFormError(error?.message || "Failed to create post");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (status === "loading" || status === "unauthenticated") {
        return (
            <>
                <CssBaseline />
                <NavBar />
                <Container maxWidth="lg" sx={{ mt: 6 }}>
                    <Typography variant="body1">Loading...</Typography>
                </Container>
            </>
        );
    }

    return (
        <>
            <CssBaseline />
            <NavBar />


            <Container maxWidth="lg">
                <Box
                    sx={{
                        mt: 2,
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "200px 1fr 200px" },
                        gap: { xs: 3, md: 3 },
                        alignItems: "stretch",
                    }}
                >
                    <Box
                        component="aside"
                        sx={{
                            display: { xs: "none", md: "block" },
                            borderRight: { xs: "none", md: "1px solid rgba(0,0,0,0.12)" },
                            borderRadius: 2,
                            pr: { xs: 0, md: 2 },
                            bgcolor: "transparent",
                            height: "100%",
                            minHeight: "100vh",
                        }}
                    >
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                            Suggested Societies
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Coming soon.
                        </Typography>
                    </Box>




                    <Box sx={{ height: "100%" }} component="form" onSubmit={handleSubmit}>
                        <Typography variant="h4" component="h1" align="left" sx={{ m: 3, ml: 0, mt: 5 }}>
                            Create Post
                        </Typography>

                        {formError ? <Alert severity="error" sx={{ mb: 2 }}>{formError}</Alert> : null}
                        {formSuccess ? <Alert severity="success" sx={{ mb: 2 }}>{formSuccess}</Alert> : null}


                        <Box sx={{ minWidth: 200, width: "20%" }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Society</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Society"
                                    value={selectedSocietyId}
                                    onChange={(event) => setSelectedSocietyId(event.target.value)}
                                    disabled={isLoadingSocieties || societies.length === 0}
                                >
                                    {societies.map((society) => (
                                        <MenuItem key={String(society._id)} value={String(society._id)}>
                                            {society.Soc_Name || "Unnamed Society"}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>


                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 3 }}>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                placeholder="Title"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                            />

                            <TextField
                                id="outlined-multiline-static"
                                multiline
                                rows={6}
                                placeholder="Body Text"
                                value={bodyText}
                                onChange={(event) => setBodyText(event.target.value)}
                            />

                            <Box sx={{ display: "grid", gap: 1 }}>
                                <Typography variant="subtitle2">Image (optional)</Typography>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) => setSelectedImage(event.target.files?.[0] || null)}
                                />
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>

                                <Button variant="contained" type="submit" disabled={isSubmitting || isLoadingSocieties || societies.length === 0}>
                                    {isSubmitting ? "Submitting..." : "Submit"}
                                </Button>
                            </Box>
                        </Box>




                    </Box>


                </Box>
            </Container>
        </>
    );
}
