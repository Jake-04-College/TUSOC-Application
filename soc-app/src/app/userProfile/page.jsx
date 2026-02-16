"use client";

import * as React from "react";
import {AppBar, Avatar, Box, Button, Card, CardContent, Container, CssBaseline, Stack, Toolbar, Typography, Grid } from "@mui/material";
import MediaCard from "../components/MediaCard";
import {useRouter} from "next/navigation";

export default function UserProfile() {
    const user = {
        name: "Brevin Monks",
        username: "BrevInTheHouse",
        pronouns: "He/Him",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        avatar: "https://i.pinimg.com/736x/9f/1c/34/9f1c345f24bbb6e1c33bdb6ca2ede122.jpg",
        course:"Computing - TU860"
    };

    const [posts, setPosts] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const router = useRouter();

    React.useEffect(() => {
        async function fetchPosts() {
            try {
                const res = await fetch("/api/getPosts");
                if (!res.ok) throw new Error("Failed to load posts");
                const data = await res.json();
                setPosts(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Failed to fetch posts", error);
                setPosts([]);
            } finally {
                setIsLoading(false);
            }
        }

        fetchPosts();
    }, []);

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
                        
                        <Typography color="text.secondary">
                            {user.course}
                        </Typography>
                        
                        <Typography align="center">
                            {user.bio}
                        </Typography>
                        
                        {/*
                        <Button variant="contained" 
                        onClick={() => router.push("/editProfile")}>
                            Edit Profile
                        </Button>
                        */}
                    </Stack>
                </CardContent>
            </Card>

            <Box sx={{ height: "100%" }}>
                <Typography variant="h4" component="h1" align="center" sx={{ mb: 3 }}>
                    {user.username}'s Posts
                </Typography>

                {isLoading ? (
                    <Typography variant="body1" align="center">
                        Loading posts...
                    </Typography>
                ) : posts.length === 0 ? (
                    <Typography variant="body1" align="center">
                        No posts yet.
                    </Typography>
                ) : (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, }}>
                        {posts.map((post) => (
                            <MediaCard
                                key={post._id}
                                username={post.username}
                                timePosted={post.timePosted}
                                title={post.title}
                                image={post.image}
                                likes={post.likes}
                                comments={post.comments}
                                profilePic={post.profilePic}
                            />
                        ))}
                    </Box>
                )}
            </Box>
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
