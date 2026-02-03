"use client";

import * as React from "react";
import { AppBar, Avatar, Box, Button, Card, CardContent, Container, CssBaseline, Toolbar, Typography } from "@mui/material";
import MediaCard from "../components/MediaCard";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


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

            <Box sx={{ position: "relative", width: "100%", height: 220, mb: 12 }}>
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
                    variant="h4"
                    sx={{
                        position: "absolute",
                        left: 380,
                        bottom: -70,
                        fontWeight: 600,
                        size: 180
                         
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
                                        height: "100%",
                                        minHeight: "100vh",
                                    }}
                                >
                                    <Card sx={{ mb: 2, width: 300, height: 500, bgcolor: '#e9e8e8' }}>
                                        <CardContent sx={{ 
                                            height: '100%', 
                                            display: 'flex', 
                                            flexDirection: 'column',
                                            justifyContent: 'space-between'
                                        }}>
                                            <Box>
                                                <Typography variant="h6" component="h2" gutterBottom>
                                                    About This Society
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                   return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Age</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={age}
        label="Age"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" >
                                                    Duis aute irure dolor in reprehenderit in voluptate velit esse 
                                                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
                                                    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.
                                                </Typography>
                                            </Box>
                                            <Button 
                                                variant="outlined" 
                                                fullWidth
                                                sx={{ 
                                                    bgcolor: '#1976d2',
                                                    color: 'white',
                                                    '&:hover': {
                                                        bgcolor: '#1565c0'
                                                    }
                                                }}
                                            >
                                                Events
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Box>
                            </Box>
                        </Container>
        </>
    );
}