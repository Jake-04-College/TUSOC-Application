"use client";

import * as React from "react";
import { Box, Container, CssBaseline, Typography } from "@mui/material";
import NavBar from "../components/navbar/Navbar";
import { MediaCard } from "../components/cards/cards.jsx";

export default function HomePage() {
    const [posts, setPosts] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        async function fetchPosts() {
            try {
                const res = await fetch("/api/get/getPosts");
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
            <NavBar/>
                    

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

                      
                      

                    <Box sx={{ height: "100%" }}>
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
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, }}>
                                {posts.map((post) => (
                                    <MediaCard
                                        key={post._id}
                                        postId={post._id}
                                        userID={post.userID}
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

                    <Box
                        component="aside"
                        sx={{
                            borderLeft: { xs: "none", md: "1px solid rgba(0,0,0,0.12)" },
                            borderRadius: 2,
                            pl: { xs: 0, md: 2 },
                            bgcolor: "transparent",
                            height: "100%",
                            minHeight: "100vh",
                        }}
                    >
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                            Filler Text
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </>
    );
}
