"use client";

import * as React from "react";
import { AppBar, Avatar, Box, Container, CssBaseline, Toolbar, Typography } from "@mui/material";
import MediaCard from "../components/MediaCard";

export default function SocietyPage() {
    const name = "My Society";
    const bannerUrl = "https://static.vecteezy.com/system/resources/previews/000/701/690/non_2x/abstract-polygonal-banner-background-vector.jpg";
    const iconUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-tinwOoW2vJ5nm3jO-4nS2rAVQHXkKeNsFQ&s";

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

            <Box sx={{ position: "relative", width: "100%", height: 220, mb: 6 }}>
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: `url(${bannerUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        filter: "none",
                    }}
                />
                <Avatar
                    src={iconUrl}
                    alt={name || "Society icon"}
                    sx={{
                        position: "absolute",
                        left: 200,
                        bottom: -82,
                        width: 160,
                        height: 160,
                        border: "3px solid",
                        borderColor: "background.paper",
                        boxShadow: 2,
                        bgcolor: "background.paper",
                    }}
                />
                <Typography
                    variant="h5"
                    sx={{
                        position: "absolute",
                        left: 380,
                        bottom: -70,
                        fontWeight: 600,
                        size: 120
                    }}
                >
                    Society Name
                </Typography>
            </Box>
                                
            
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
                                        borderLeft: { xs: "none", md: "px solid rgba(0, 0, 0, 0)" },
                                        borderRadius: 2,
                                        pl: { xs: 4, md: 7 },
                                        bgcolor: "rgba(0, 0, 0, 0.36)",
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

