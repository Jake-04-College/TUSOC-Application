"use client";

import * as React from "react";
import {
    Alert,
    Avatar,
    Box,
    Button,
    Container,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import { useRouter } from "next/navigation";
import NavBar from "../../../components/navbar/Navbar";

export default function EditSociety({ initialData }) {
    const router = useRouter();

    const [formData, setFormData] = React.useState({
        Soc_Name: initialData?.Soc_Name || "",
        Soc_Desc: initialData?.Soc_Desc || "",
        Soc_Campus: initialData?.Soc_Campus || "",
        Soc_Category: initialData?.Soc_Campus || "",
        Soc_Logo: initialData?.Soc_Logo || "",
        Soc_Banner: initialData?.Soc_Banner || "",
    });

    const [logoFile, setLogoFile] = React.useState(null);
    const [bannerFile, setBannerFile] = React.useState(null);

    const [logoPreview, setLogoPreview] = React.useState(initialData?.Soc_Logo || "");
    const [bannerPreview, setBannerPreview] = React.useState(initialData?.Soc_Banner || "");

    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [formError, setFormError] = React.useState("");

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    function handleImageChange(e, type) {
        const file = e.target.files?.[0];
        if (!file) return;

        const preview = URL.createObjectURL(file);

        if (type === "logo") {
            setLogoFile(file);
            setLogoPreview(preview);
        } else {
            setBannerFile(file);
            setBannerPreview(preview);
        }
    }

    async function uploadImage(file) {
        const form = new FormData();
        form.append("image", file);
        form.append("folder", "soc-app/societies");

        const res = await fetch("/api/cloudinary", {
            method: "POST",
            body: form,
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data?.error || "Upload failed");

        return data.imageUrl;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setIsSubmitting(true);
        setFormError("");

        try {
            let logoUrl = formData.Soc_Logo;
            let bannerUrl = formData.Soc_Banner;

            if (logoFile) {
                logoUrl = await uploadImage(logoFile);
            }

            if (bannerFile) {
                bannerUrl = await uploadImage(bannerFile);
            }

            const res = await fetch("/api/post/updateSociety", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    Soc_Logo: logoUrl,
                    Soc_Banner: bannerUrl,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setFormError(data?.error || "Failed to update");
                return;
            }

            router.push(data?.societyPath || initialData?.societyPath);
            router.refresh();
        } catch (err) {
            setFormError(err.message);
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
                        Edit Society
                    </Typography>

                    {formError && <Alert severity="error">{formError}</Alert>}

                    {bannerPreview && (
                        <Box
                            component="img"
                            src={bannerPreview}
                            sx={{ width: "100%", height: 150, objectFit: "cover", borderRadius: 2 }}
                        />
                    )}

                    <Avatar
                        src={logoPreview}
                        sx={{ width: 100, height: 100, mx: "auto" }}
                    />

                    <TextField
                        label="Society Name"
                        name="name"
                        value={formData.Soc_Name}
                        onChange={handleChange}
                        required
                        fullWidth
                    />

                    <TextField
                        label="Campus"
                        name="campus"
                        value={formData.Soc_Campus}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        label="Category"
                        name="category"
                        value={formData.Soc_Category}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        label="Description"
                        name="description"
                        value={formData.Soc_Desc}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        fullWidth
                    />

                    <Box>
                        <Typography>Logo</Typography>
                        <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, "logo")} />
                    </Box>

                    <Box>
                        <Typography>Banner</Typography>
                        <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, "banner")} />
                    </Box>

                    <Stack direction="row" spacing={2}>
                        <Button onClick={() => router.back()} fullWidth>
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