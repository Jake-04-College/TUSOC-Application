"use client";

import * as React from "react";
import {AppBar, Box, Button, CssBaseline, Toolbar, Typography, Grid} from "@mui/material";
import {Dialog, DialogTitle, DialogContent, TextField, DialogActions} from "@mui/material";
import {Paper, Table, TableHead, TableBody, TableContainer, TableCell, TableRow} from "@mui/material";
import {useRouter} from "next/navigation";

export default function AdminPanel(){
    const [view, setView] = React.useState("students");
    const [students, setStudents] = React.useState([]);
    const [societies, setSocieties] = React.useState([]);
    const [posts, setPosts] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [editItem, setEditItem] = React.useState(null);
    const [openDialog, setOpenDialog] = React.useState(false);
    const router = useRouter();

    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                if (view === "students"){

                    const res = await fetch("../../api/get/getUsers");
                    const data = await res.json();
                    setStudents(data);
                }

                else if (view === "societies"){
                    
                    const res = await fetch("../../api/get/getSocietys");
                    const data = await res.json();
                    setSocieties(data);
                }
                
                else if (view === "posts"){
                    
                    const res = await fetch("../../api/get/getPosts");
                    const data = await res.json();
                    setPosts(data);
                }
            }
            catch (e){
                console.error(e);
            }
            setLoading(false);
        };
        fetchData();
    }, [view]);

    const handleDelete = async (item) => {
    try {
        const endpoint =
            view === "students"
                ? `/api/delete/users/${item._id}`
                : view === "societies"
                ? `/api/delete/societies/${item._id}`
                : `/api/delete/posts/${item._id}`;

        await fetch(endpoint, {
            method: "DELETE"
        });

        if (view === "students") {
            setStudents((prev) => prev.filter((s) => s._id !== item._id));
        }
        else if (view === "societies") {
            setSocieties((prev) => prev.filter((s) => s._id !== item._id));
        }
        else if (view === "posts") {
            setPosts((prev) => prev.filter((p) => p._id !== item._id));
        }
    }
    catch (e) {
        console.error(e);
    }
};

    return (
        <>
            <CssBaseline/>

            <AppBar position="static">
                <Typography variant="h5">Administration Panel</Typography>
                <Toolbar/>
            </AppBar>

            <Grid container minHeight="100vh"> 
                <Grid
                    item
                    xs={12}
                    md={3}
                    sx={{
                        borderRight: "1px solid #e0e0e0",
                        p: 2
                    }}>
                    <Box display="flex" flexDirection="column" gap={2} mt={2}>
                        <button onClick={() => setView("students")} style={{height: 50, width: 200}}>Students</button>
                        <button onClick={() => setView("societies")} style={{height: 50, width: 200}}>Societies</button>
                        <button onClick={() => setView("posts")} style={{height: 50, width: 200}}>Posts</button>
                    </Box>
                </Grid>

                <Grid item xs={12} md={9} sx={{ p: 3 }}>
                    {loading && <Typography>Loading...</Typography>}

                    {!loading && view === "students" && (
                        <Box>
                            <Typography variant="h6">Students</Typography>

                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><strong>Username</strong></TableCell>
                                            <TableCell><strong>Email</strong></TableCell>
                                            <TableCell><strong>Course Code</strong></TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {students.map((s) => (
                                            <TableRow key={s._id}>
                                                <TableCell>{s.username}</TableCell>
                                                <TableCell>{s.email}</TableCell>
                                                <TableCell>{s.courseCode}</TableCell>

                                                <TableCell align="right">
                                                    <Button
                                                        variant="outlined"
                                                        color="error"
                                                        size="small"
                                                        onClick={() => {
                                                            if (confirm("Are you sure you want to delete this item?")){
                                                                handleDelete(s);
                                                            }
                                                        }}
                                                    >
                                                        Delete
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    )}

                    {!loading && view === "societies" && (
                        <Box>
                            <Typography variant="h6">Societies</Typography>

                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><strong>Society</strong></TableCell>
                                            <TableCell><strong>Campus</strong></TableCell>
                                            <TableCell><strong>Category</strong></TableCell>
                                            <TableCell><strong>Member Count</strong></TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {societies.map((s) => (
                                            <TableRow key={s._id}>
                                                <TableCell>{s.Soc_Name}</TableCell>
                                                <TableCell>{s.Soc_Campus}</TableCell>
                                                <TableCell>{s.Soc_Category}</TableCell>
                                                <TableCell>{s.Member_Count}</TableCell>

                                                <TableCell align="right">
                                                    <Button
                                                        variant="outlined"
                                                        size="small"
                                                        onClick={() => router.push("../updateSociety")}
                                                        sx={{ mr: 1 }}
                                                    >
                                                        Edit
                                                    </Button>

                                                    <Button
                                                        variant="outlined"
                                                        color="error"
                                                        size="small"
                                                        onClick={() => {
                                                            if (confirm("Are you sure you want to delete this item?")){
                                                                handleDelete(s);
                                                            }
                                                        }}
                                                    >
                                                        Delete
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                </TableContainer>
                        </Box>
                    )}

                    {!loading && view === "posts" && (
                        <Box>
                            <Typography variant="h6">Posts</Typography>

                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><strong>User</strong></TableCell>
                                            <TableCell><strong>Society</strong></TableCell>
                                            <TableCell><strong>Title</strong></TableCell>
                                            <TableCell><strong>Date Posted</strong></TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {posts.map((s) => (
                                            <TableRow key={s._id}>
                                                <TableCell>{s.username}</TableCell>
                                                <TableCell>{s.societyName}</TableCell>
                                                <TableCell>{s.title}</TableCell>
                                                <TableCell>{s.timePosted}</TableCell>

                                                <TableCell align="right">
                                                    <Button
                                                        variant="outlined"
                                                        color="error"
                                                        size="small"
                                                        onClick={() => {
                                                            if (confirm("Are you sure you want to delete this item?")){
                                                                handleDelete(s);
                                                            }
                                                        }}
                                                    >
                                                        Delete
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    )}
                </Grid>
            </Grid>
        </>
    )
}
