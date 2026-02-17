"use client";

import * as React from "react";
import { Box, Container, CssBaseline, Typography } from "@mui/material";
import MediaCard from "../components/mediacard/MediaCard";
import NavBar from "../components/navbar/Navbar";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function PostPage() {
    return (
        <>
            <CssBaseline />
            <NavBar />


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
                        <Typography variant="h4" component="h1" align="left" sx={{ m: 3, ml: 0, mt: 5 }}>
                            Create Post
                        </Typography>


                        <Box sx={{ minWidth: 200, width: "20%" }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Society</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Society"
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>


                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt:3 }}>
                            <TextField id="outlined-basic" variant="outlined" placeholder="Title" />

                             <TextField
                                id="outlined-multiline-static"
                                multiline
                                rows={6}
                                placeholder="Body Text"
                            />

                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>

                                <Button variant="contained">Submit</Button>
                            </Box>
                        </Box>




                    </Box>


                </Box>
            </Container>
        </>
    );
}
