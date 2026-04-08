"use client";

import * as React from "react";
import { Alert, Avatar, Box, Button, Container, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import NavBar from "../../../components/navbar/Navbar";

export default function EditProfile({ userData }) {
    const router = useRouter();
    const [formData, setFormData] = React.useState({
        username: userData?.username || "",
        pronouns: userData?.pronouns || "",
        bio: userData?.bio || "",
        avatar: userData?.avatar || "",
    });
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [previewUrl, setPreviewUrl] = React.useState(userData?.avatar || "");
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [formError, setFormError] = React.useState("");

    React.useEffect(() => {
        return () => {
            if (previewUrl && previewUrl.startsWith("blob:")) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((current) => ({
            ...current,
            [name]: value,
        }));
    }

    function handleImageChange(event) {
        const file = event.target.files?.[0] || null;
        setFormError("");

        if (previewUrl && previewUrl.startsWith("blob:")) {
            URL.revokeObjectURL(previewUrl);
        }

        if (!file) {
            setSelectedImage(null);
            setPreviewUrl(formData.avatar || userData?.avatar || "");
            return;
        }

        setSelectedImage(file);
        setPreviewUrl(URL.createObjectURL(file));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setFormError("");
        setIsSubmitting(true);

        try {
            let avatarUrl = formData.avatar;

            if (selectedImage) {
                const uploadData = new FormData();
                uploadData.append("image", selectedImage);
                uploadData.append("folder", "soc-app/profiles");

                const uploadResponse = await fetch("/api/cloudinary", {
                    method: "POST",
                    body: uploadData,
                });

                const uploadPayload = await uploadResponse.json().catch(() => null);

                if (!uploadResponse.ok) {
                    setFormError(uploadPayload?.error || "Failed to upload image.");
                    return;
                }

                avatarUrl = uploadPayload?.imageUrl || avatarUrl;
            }

            const response = await fetch("/api/post/updateProfile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: formData.username,
                    pronouns: formData.pronouns,
                    bio: formData.bio,
                    avatar: avatarUrl,
                }),
            });

            const payload = await response.json().catch(() => null);

            if (!response.ok) {
                setFormError(payload?.error || "Failed to update profile.");
                return;
            }

            router.push(payload?.profilePath || userData?.profilePath || "/home");
            router.refresh();
        } catch {
            setFormError("Failed to update profile.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <>
            <NavBar />
            <Container maxWidth="sm">
                <Stack component="form" spacing={3} sx={{ mt: 4 }} onSubmit={handleSubmit}>
                    <Typography variant="h4" align="center">
                        Edit Profile
                    </Typography>

                    {formError ? <Alert severity="error">{formError}</Alert> : null}

                    <Avatar src={previewUrl || undefined} sx={{ width: 100, height: 100, mx: "auto" }}>
                        {!previewUrl && formData.username?.charAt(0)?.toUpperCase()}
                    </Avatar>

                    <TextField
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        fullWidth
                        required
                    />

                    <TextField
                        label="Pronouns"
                        name="pronouns"
                        value={formData.pronouns}
                        onChange={handleChange}
                        fullWidth
                    />

                    <Box sx={{ display: "grid", gap: 1 }}>
                        <Typography variant="subtitle2">Profile image</Typography>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            disabled={isSubmitting}
                        />
                    </Box>

                    <TextField
                        label="Bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        fullWidth
                    />

                    <Stack direction="row" spacing={2}>
                        <Button variant="outlined" fullWidth onClick={() => router.back()} disabled={isSubmitting}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" fullWidth disabled={isSubmitting}>
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                    </Stack>
                </Stack>
            </Container>
        </>
    );
}
