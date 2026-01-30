"use client";

import * as React from "react";
import {AppBar, Avatar, Box, Button, Card, CardContent, Container, CssBaseline, Stack, Toolbar, Typography, Grid } from "@mui/material";
import MediaCard from "../components/MediaCard";

export default function UserProfile() {
    const user = {
        name: "Brevin Monks",
        username: "BrevInTheHouse",
        pronouns: "He/Him",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        avatar: "https://i.pinimg.com/736x/9f/1c/34/9f1c345f24bbb6e1c33bdb6ca2ede122.jpg"
    };

    return (
        <Container maxWidth="sm">
            <Card sx={{ mt: 4, p: 2 }}>
                <CardContent>
                    <Stack spacing={2} alignItems="center">
                        <Avatar src={user.avatar} sx={{ width: 100, height: 100 }}/>
                        
                        <Typography variant="h5">{user.username}</Typography>
                        <Typography color="text.secondary">
                            {user.name}
                            {" - "}
                            {user.pronouns}
                        </Typography>
                        
                        <Typography align="center">
                            {user.bio}
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>
        </Container>
    );
}

function Stat({ label, value }) {
  return (
    <Box textAlign="center">
      <Typography variant="h6">{value}</Typography>
      <Typography color="text.secondary" variant="body2">
        {label}
      </Typography>
    </Box>
  );
}
