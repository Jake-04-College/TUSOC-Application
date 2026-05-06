"use client";

import * as React from "react";
import {Box, Card, CardContent, Container, CssBaseline, Typography } from "@mui/material";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import NavBar from "../components/navbar/Navbar.jsx";
import { SocietyCard } from "../components/cards/cards.jsx";



export default function SocietyPage() {
    const name = "My Society";
    const bannerUrl = "https://static.vecteezy.com/system/resources/previews/000/701/690/non_2x/abstract-polygonal-banner-background-vector.jpg";
    const iconUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-tinwOoW2vJ5nm3jO-4nS2rAVQHXkKeNsFQ&s";
    // Filter choices shown in the sidebar.
    const campusOptions = ["City", "Blanchardstown", "Tallaght"];
    const categoryOptions = ["Technology", "Art", "Music", "Cultural", "Sport", "Computer", "Electronics"];

    const [posts, setPosts] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [campusFilters, setCampusFilters] = React.useState(Object.fromEntries(campusOptions.map(option => [option, false])));
    const [categoryFilters, setCategoryFilters] = React.useState(Object.fromEntries(categoryOptions.map(option => [option, false])));

    React.useEffect(() => {
        async function fetchPosts() {
            try {
                const res = await fetch("/api/get/getSocietys");
                if (!res.ok) throw new Error("Failed to load societies");
                const data = await res.json();
                setPosts(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Failed to fetch societies", error);
                setPosts([]);
            } finally {
                setIsLoading(false);
            }
        }

        fetchPosts();
    }, []);

    // Reuse one change handler for both filter groups.
    const handleFilterChange = (setFilters) => (event) => setFilters(prev => ({ ...prev, [event.target.name]: event.target.checked }));
    const getActiveFilters = (filters) => Object.entries(filters).filter(([, selected]) => selected).map(([name]) => name);
    // A society matches when it contains at least one selected tag.
    const matchesFilters = (selectedFilters, values) => !selectedFilters.length || selectedFilters.some(filter => values.includes(filter));
    const getFilteredSocieties = () => {
        const activeCampus = getActiveFilters(campusFilters);
        const activeCategory = getActiveFilters(categoryFilters);
        // If nothing is selected, show every society.
        return !activeCampus.length && !activeCategory.length ? posts : posts.filter(post => matchesFilters(activeCampus, post.Soc_Campus || []) && matchesFilters(activeCategory, post.Soc_Category || []));
    };

    const filteredSocieties = getFilteredSocieties();

    return (
        <>
            <CssBaseline />
            <NavBar />

            <Box>
                <Typography
                    variant="h2"
                    textAlign={'center'}
                    sx={{ my: { xs: 2, sm: 3 }, fontSize: { xs: '1.5rem', sm: '2.5rem' } }}
                >
                    Explore Societies
                </Typography>
            </Box>
            <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
                <Box
                    sx={{
                        mt: 2,
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "200px 1fr 200px" },
                        gap: { xs: 2, sm: 3 },
                        alignItems: "stretch",
                    }}
                >
                    <Box
                        component="aside"
                        sx={{
                            display: { xs: 'none', md: 'block' },
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




                    <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1, sm: 2 }, px: { xs: 1, sm: 0 } }}>
                        {isLoading ? (
                            <Typography variant="body1" align="center">
                                Loading societies...
                            </Typography>
                        ) : filteredSocieties.length === 0 ? (
                            <Typography variant="body1" align="center">
                                No societies found matching your filters.
                            </Typography>
                        ) : (
                            filteredSocieties.map((post) => (
                                <SocietyCard
                                key={post._id}
                                societyID={post._id}
                                societyName={post.Soc_Name || post.name || post.SocName}
                                membersCount={post.Member_Count || post.memberCount || 0}
                                societyDescription={post.Soc_Desc || post.SocDesc || post.description || "No description"}
                                societyLogo={post.Soc_Logo || post.logo}
                                />
                            ))
                        )}
                    </Box>

                    <Box
                        component="aside"
                        sx={{
                            display: { xs: 'none', md: 'block' },
                            borderLeft: { xs: "none", md: "px solid rgba(0, 0, 0, 0)" },
                            borderRadius: 2,
                            pl: { xs: 4, md: 1 },
                            height: "100%",
                            minHeight: "100vh",
                        }}
                    >
                        <Card sx={{ mb: 2, width: { xs: '100%', md: 300 }, bgcolor: '#e9e8e8' }}>
                            <CardContent sx={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <Box>
                                    <Typography variant="h3" component="h2" gutterBottom sx={{ fontSize: { xs: '1.25rem', sm: '1.75rem' } }}>
                                        Filters
                                    </Typography>

                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', my: 0.4 }}>
                                        <Typography variant="h5" component="h3" sx={{ fontSize: { xs: '0.95rem', sm: '1.25rem' } }}>
                                            Campus
                                        </Typography>
                                        <FormGroup sx={{ ml: 2, my: 1 }}>
                                            {campusOptions.map(option => <FormControlLabel key={option} control={<Checkbox name={option} checked={campusFilters[option]} onChange={handleFilterChange(setCampusFilters)} />} label={option} />)}
                                        </FormGroup>
                                    </Box>

                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', my: 0.4 }}>
                                        <Typography variant="h5" component="h3" sx={{ fontSize: { xs: '0.95rem', sm: '1.25rem' } }}>
                                            Category
                                        </Typography>
                                        <FormGroup sx={{ pl: 2, my: '1px' }}>
                                            {categoryOptions.map(option => <FormControlLabel key={option} control={<Checkbox name={option} checked={categoryFilters[option]} onChange={handleFilterChange(setCategoryFilters)} />} label={option} />)}
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

