"use client";

import {Avatar, Box, Button,  Card, CardContent, Container, CssBaseline, Typography} from "@mui/material";
import Navbar from "../../../components/navbar/Navbar"

export default function SocietyTemplate({ society, posts }) {
    const bannerUrl = society?.Soc_Banner;
    const iconUrl = society?.Soc_Logo || "";
    const name = society?.Soc_Name || "Society";


    return (
        <>
            <CssBaseline />
            <Navbar /> 

            <Box sx={{ position: "relative", width: "100%", height: 220, mb: 12 }}>
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: `url(${bannerUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <Avatar
                    src={iconUrl}
                    alt={name}
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
                    }}
                >
                    {name}
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
                    <Box component="aside">
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                            Society Committee
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Coming soon.
                        </Typography>
                    </Box>

                    <Box sx={{ height: "100%" }}>
                        <Typography variant="h4" component="h1" align="center" sx={{ mb: 3 }}>
                            Media Feed
                        </Typography>

                        {posts.length === 0 ? (
                            <Typography variant="body1" align="center">
                                No posts yet.
                            </Typography>
                        ) : (
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                {posts.map((post) => (
                                    <Box key={post._id}>
                                        <MediaCard {...post} />
                                        <Typography>{post.title}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </Box>

                    <Box component="aside" sx={{ pl: { xs: 4, md: 7 } }}>
                        <Card sx={{ mb: 2, width: 300, height: 500, bgcolor: "#e9e8e8" }}>
                            <CardContent
                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Box>
                                    <Typography variant="h6" component="h2" gutterBottom>
                                        About This Society
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {society?.Soc_Description || "No description yet."}
                                    </Typography>
                                </Box>

                                <Button
                                    variant="outlined"
                                    fullWidth
                                    sx={{
                                        bgcolor: "#1976d2",
                                        color: "white",
                                        "&:hover": { bgcolor: "#1565c0" },
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
