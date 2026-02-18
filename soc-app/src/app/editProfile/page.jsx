"use client";

import * as React from "react";
import {AppBar, Avatar, Box, Button, Card, CardContent, Container, CssBaseline, Stack, TextField, Toolbar, Typography, Grid } from "@mui/material";
import MediaCard from "../components/MediaCard";
import {useRouter} from "next/navigation";

export default function EditProfile(){
    {/* change to pull user info */}
    const [formData, setFormData] = React.useState({
        username: "",
        pronouns: "",
        bio: "",
        avatar: ""
    });

    const router = useRouter();

    function changeProfile(e){
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    async function saveProfile(){
        await fetch("/api/updateProfile", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData)
        });

        router.push("/userProfile");
    }

    return (
        <Container maxWidth="sm">
            <Stack spacing={3} sx={{ mt: 4 }}>
                <Typography variant="h4" align="center">
                    Edit Profile
                </Typography>

                <Avatar src={formData.avatar} sx={{ width: 100, height: 100, mx: "auto" }}/>

                <TextField
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={changeProfile}
                    fullWidth
                />

                <TextField
                    label="Pronouns"
                    name="pronouns"
                    value={formData.pronouns}
                    onChange={changeProfile}
                    fullWidth
                />

                {/* change to upload file*/}
                {
                <TextField
                    label="Avatar URL"
                    name="avatar"
                    value={formData.avatar}
                    onChange={changeProfile}
                    fullWidth
                />
                }

                <TextField
                    label="Bio"
                    name="bio"
                    value={formData.bio}
                    onChange={changeProfile}
                    multiline
                    rows={4}
                    fullWidth
                />
                
                <Stack direction="row" spacing={2}>
                    <Button variant="outlined" fullWidth onClick={() => router.back()}>
                        Cancel
                    </Button>
                    <Button variant="contained" fullWidth onClick={saveProfile}>
                        Save Changes
                    </Button>
                </Stack>
            </Stack>
        </Container>
    );
}
