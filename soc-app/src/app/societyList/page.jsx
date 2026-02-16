"use client";

import * as React from "react";
import { AppBar, Avatar, Box, Button, Card, CardContent, Container, CssBaseline, Toolbar, Typography } from "@mui/material";
import MediaCard from "../components/MediaCard.jsx";
import SocietyCard from "../components/societycard/societyCard.jsx";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import NavBar from "../components/navbar/Navbar.jsx";



export default function SocietyPage() {
    const name = "My Society";
    const bannerUrl = "https://static.vecteezy.com/system/resources/previews/000/701/690/non_2x/abstract-polygonal-banner-background-vector.jpg";
    const iconUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-tinwOoW2vJ5nm3jO-4nS2rAVQHXkKeNsFQ&s";

    const [posts, setPosts] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        async function fetchPosts() {
            try {
                const res = await fetch("/api/get/getSocietys");
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
            <NavBar />

            <Box>
                <Typography variant="h2" textAlign={'center'} my={'20px'}> Explore Socities </Typography>
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




                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, }}>
                        {posts.map((post) => (
                            <SocietyCard
                            key={post._id} 
                            societyName={post.Soc_Name}
                            membersCount={post.Member_Count}
                            societyDescription={post.Soc_Desc}
                            />
                        ))}
                    </Box>

                    <Box
                        component="aside"
                        sx={{
                            borderLeft: { xs: "none", md: "px solid rgba(0, 0, 0, 0)" },
                            borderRadius: 2,
                            pl: { xs: 4, md: 1 },
                            height: "100%",
                            minHeight: "100vh",
                        }}
                    >
                        <Card sx={{ mb: 2, width: 300, bgcolor: '#e9e8e8' }}>
                            <CardContent sx={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <Box>
                                    <Typography variant="h3" component="h2" gutterBottom>
                                        Filters
                                    </Typography>

                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', my: 0.4 }}>
                                        <Typography variant="h5" component="h3">
                                            Campus
                                        </Typography>
                                        <FormGroup sx={{ ml: 2, my: 1 }}>
                                            <FormControlLabel control={<Checkbox />} label="City" />
                                            <FormControlLabel control={<Checkbox />} label="Blanchardstown" />
                                            <FormControlLabel control={<Checkbox />} label="Tallaght" />
                                        </FormGroup>
                                    </Box>

                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', my: 0.4 }}>
                                        <Typography variant="h5" component="h3">
                                            Category
                                        </Typography>
                                        <FormGroup sx={{ pl: 2, my: '1px' }}>
                                            <FormControlLabel control={<Checkbox />} label="Art" />
                                            <FormControlLabel control={<Checkbox />} label="Electronics" />
                                            <FormControlLabel control={<Checkbox />} label="Computer" />
                                            <FormControlLabel control={<Checkbox />} label="Sport" />
                                            <FormControlLabel control={<Checkbox />} label="Cultural" />
                                            <FormControlLabel control={<Checkbox />} label="Music" />



                                        </FormGroup>
                                    </Box>

                                </Box>

                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </Container>
        </>
    );
}

