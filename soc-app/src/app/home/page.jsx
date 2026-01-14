"use client";

import * as React from "react";
import { AppBar, Box, Container, CssBaseline, Toolbar, Typography } from "@mui/material";
import MediaCard from "../components/MediaCard";

export default function HomePage() {
    const [posts, setPosts] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

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
        <>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar />
            </AppBar>

            <Container maxWidth="sm">
                <Box sx={{ height: "100%", mt: 2 }}>
                    <Typography variant="h4" component="h1" align="center" sx={{ mb: 3 }}>
                        Media Feed
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
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            {posts.map((post) => (
                                <MediaCard
                                    key={post._id}
                                    username={post.username}
                                    timePosted={post.timePosted}
                                    title={post.title}
                                    likes={post.likes}
                                    comments={post.comments}
                                    profilePic={post.profilePic}
                                />
                            ))}
                        </Box>
                    )}
                </Box>
            </Container>
        </>
    );
}
