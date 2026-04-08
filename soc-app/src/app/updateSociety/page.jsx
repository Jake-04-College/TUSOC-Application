"use client";

import * as React from "react";
import { Avatar, Button, Container, Stack, TextField, Typography } from "@mui/material";
import {useRouter} from "next/navigation";

export default function EditSociety(){
    {/* change to pull soc info */}
    const [formData, setFormData] = React.useState({
        socName: "",
        description: "",
        banner: "",
        icon: ""
    });

    const router = useRouter();

    function changeSociety(e){
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    async function saveSociety(){
        {/*change to correct api directory plus add api*/}
        await fetch("/api/updateSociety", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData)
        });

        router.push("/societies");
    }

    return (
        <Container maxWidth="sm">
            <Stack spacing={3} sx={{ mt: 4 }}>
                <Typography variant="h4" align="center">
                    Edit Profile
                </Typography>

                <Avatar src={formData.avatar} sx={{ width: 100, height: 100, mx: "auto" }}/>

                <TextField
                    label="Society Name"
                    name="socName"
                    value={formData.socName}
                    onChange={changeSociety}
                    fullWidth
                />

                <TextField
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={changeSociety}
                    multiline
                    rows={4}
                    fullWidth
                />

                {/* change to upload file*/}
                {
                <TextField
                    label="Banner URL"
                    name="banner"
                    value={formData.banner}
                    onChange={changeSociety}
                    fullWidth
                />
                }

                <TextField
                    label="Icon URL"
                    name="icon"
                    value={formData.icon}
                    onChange={changeSociety}
                    fullWidth
                />
                
                <Stack direction="row" spacing={2}>
                    <Button variant="outlined" fullWidth onClick={() => router.back()}>
                        Cancel
                    </Button>
                    <Button variant="contained" fullWidth onClick={saveSociety}>
                        Save Changes
                    </Button>
                </Stack>
            </Stack>
        </Container>
    );
}
