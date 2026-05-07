"use client";

import * as React from "react";
import {Alert, Avatar, Box, Button, Container, Stack, TextField, Typography} from "@mui/material";
import { useRouter } from "next/navigation";
import NavBar from "../../../components/navbar/Navbar";

export default function UpdateSociety({ initialData }) {
    const router = useRouter();

    const [formData, setFormData] = React.useState({
        Soc_Name: "",
        Soc_Desc: "",
        Soc_Campus: "",
        Soc_Category: "",
        Soc_Logo: "",
        Soc_Banner: "",
    });

    const [isHydrated, setIsHydrated] = React.useState(false);

    React.useEffect(() => {
        if (initialData && !isHydrated) {
            setFormData({
                Soc_Name: initialData.Soc_Name || "",
                Soc_Desc: initialData.Soc_Desc || "",
                Soc_Campus: initialData.Soc_Campus || "",
                Soc_Category: initialData.Soc_Category || "",
                Soc_Logo: initialData.Soc_Logo || "",
                Soc_Banner: initialData.Soc_Banner || "",
            });
            setIsHydrated(true);
        }
    }, [initialData, isHydrated]);

    const [logoFile, setLogoFile] = React.useState(null);
    const [bannerFile, setBannerFile] = React.useState(null);

    const [logoPreview, setLogoPreview] = React.useState(initialData?.Soc_Logo || "");
    const [bannerPreview, setBannerPreview] = React.useState(initialData?.Soc_Banner || "");

    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [formError, setFormError] = React.useState("");

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((current) => ({
            ...current,
            [name]: value,
        }));
    }

    function handleImageChange(e, type) {
        const file = e.target.files?.[0];
        if (!file) return;

        const preview = URL.createObjectURL(file);

        if (type === "Soc_Logo") {
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
                        name="Soc_Name"
                        value={formData.Soc_Name}
                        onChange={handleChange}
                        required
                        fullWidth
                    />

                    <TextField
                        label="Campus"
                        name="Soc_Campus"
                        value={formData.Soc_Campus}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        label="Category"
                        name="Soc_Category"
                        value={formData.Soc_Category}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        label="Description"
                        name="Soc_Desc"
                        value={formData.Soc_Desc}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        fullWidth
                    />

                    <Box>
                        <Typography>Logo</Typography>
                        <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, "Soc_Logo")} />
                    </Box>

                    <Box>
                        <Typography>Banner</Typography>
                        <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, "Soc_Banner")} />
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
