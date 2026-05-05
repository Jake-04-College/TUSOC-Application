"use client";

import * as React from "react";
import {AppBar, Box, Button, CssBaseline, Toolbar, Typography, Grid} from "@mui/material";
import {Dialog, DialogTitle, DialogContent, TextField, DialogActions} from "@mui/material";
import {Paper, Table, TableHead, TableBody, TableContainer, TableCell, TableRow} from "@mui/material";

export default function AdminPanel(){
    const [view, setView] = React.useState("students");
    const [students, setStudents] = React.useState([]);
    const [societies, setSocieties] = React.useState([]);
    const [posts, setPosts] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [editItem, setEditItem] = React.useState(null);
    const [openDialog, setOpenDialog] = React.useState(false);

    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                if (view === "students"){
                    /*
                    PLACEHOLDER FOR NOW PLEASE REMOVE COMMENTS WHEN DB CONNECTED

                    const res = await fetch(""); // add get students api
                    const data = await res.json();
                    setStudents(data);
                    */

                    setStudents([
                        {
                            id: 1,
                            username: "test1",
                            name: "test user1",
                            email: "test@user.com",
                            phoneNum: "086 823 4657"
                        },
                        {
                            id: 2,
                            username: "test2",
                            name: "user test2",
                            email: "test",
                            phoneNum: "084 173 3719"
                        }
                    ]);
                }
                else if (view === "societies"){
                    /*
                    PLACEHOLDER FOR NOW PLEASE REMOVE COMMENTS WHEN DB CONNECTED
                    
                    const res = await fetch("../../api/get/getSocieties"); // add get societies api
                    const data = await res.json();
                    setSocieties(data);
                    */

                    setSocieties([
                        {
                            id: 1,
                            socName: "Esports Soc",
                            socOwner: "Simon"
                        },
                        {
                            id: 2,
                            socName: "Game Soc",
                            socOwner: "Chris"
                        }
                    ]);
                }
                else if (view === "posts"){
                    /*
                    PLACEHOLDER FOR NOW PLEASE REMOVE COMMENTS WHEN DB CONNECTED
                    
                    const res = await fetch("../../api/get/getPosts"); // confirm to be correct api url
                    const data = await res.json();
                    setPosts(data);
                    */

                    setPosts([
                        {
                            id: 1,
                            postOwner: "test1",
                            title: "This is a test post title",
                            timePosted: "21-2-2026"
                        },
                        {
                            id: 2,
                            postOwner: "test2",
                            title: "This is also a test post title",
                            timePosted: "4-5-2026"
                        }
                    ])
                }
            }
            catch (e){
                console.error(e);
            }
            setLoading(false);
        };
        fetchData();
    }, [view]);

    const handleSave = async () => {
        try {
            const endpoint =
                view === "students"
                    ? `/api/students/${editItem.id}`
                    : view === "societies"
                    ? `/api/societies/${editItem.id}`
                    : `/api/posts/${editItem.id}`

            await fetch(endpoint, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(editItem)
            });

            if (view === "students") {
                setStudents((prev) =>
                    prev.map((s) => (s.id === editItem.id ? editItem : s))
                );
            }
            else if (view === "societies"){
                setSocieties((prev) =>
                    prev.map((s) => (s.id === editItem.id ? editItem : s))
                );
            }
            else if (view === "posts"){
                setPosts((prev) => 
                    prev.map((s) => (s.id === editItem.id ? editItem : s))
                );
            }

            setOpenDialog(false);
        }
        catch (e) {
            console.error(e);
        }
    };

    const handleDelete = async (item) => {
    try {
        const endpoint =
            view === "students"
                ? `/api/students/${item.id}`
                : view === "societies"
                ? `/api/societies/${item.id}`
                : `/api/posts/${item.id}`;

        await fetch(endpoint, {
            method: "DELETE"
        });

        if (view === "students") {
            setStudents((prev) => prev.filter((s) => s.id !== item.id));
        }
        else if (view === "societies") {
            setSocieties((prev) => prev.filter((s) => s.id !== item.id));
        }
        else if (view === "posts") {
            setPosts((prev) => prev.filter((p) => p.id !== item.id));
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
                                            <TableCell><strong>Phone</strong></TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {students.map((s) => (
                                            <TableRow key={s.id}>
                                                <TableCell>{s.username}</TableCell>
                                                <TableCell>{s.email}</TableCell>
                                                <TableCell>{s.phoneNum}</TableCell>

                                                <TableCell align="right">
                                                    <Button
                                                        variant="outlined"
                                                        size="small"
                                                        onClick={() => {
                                                            setEditItem(s);
                                                            setOpenDialog(true);
                                                        }}
                                                        sx={{ mr: 1 }}
                                                    >
                                                        Edit
                                                    </Button>

                                                    <Button
                                                        variant="outlined"
                                                        color="error"
                                                        size="small"
                                                        onClick={() => handleDelete(s)}
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
                                            <TableCell><strong>Owner</strong></TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {societies.map((s) => (
                                            <TableRow key={s.id}>
                                                <TableCell>{s.socName}</TableCell>
                                                <TableCell>{s.socOwner}</TableCell>

                                                <TableCell align="right">
                                                    <Button
                                                        variant="outlined"
                                                        size="small"
                                                        onClick={() => {
                                                            setEditItem(s);
                                                            setOpenDialog(true);
                                                        }}
                                                        sx={{ mr: 1 }}
                                                    >
                                                        Edit
                                                    </Button>

                                                    <Button
                                                        variant="outlined"
                                                        color="error"
                                                        size="small"
                                                        onClick={() => handleDelete(s)}
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
                                            <TableCell><strong>Title</strong></TableCell>
                                            <TableCell><strong>Date Posted</strong></TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {posts.map((s) => (
                                            <TableRow key={s.id}>
                                                <TableCell>{s.postOwner}</TableCell>
                                                <TableCell>{s.title}</TableCell>
                                                <TableCell>{s.timePosted}</TableCell>

                                                <TableCell align="right">
                                                    <Button
                                                        variant="outlined"
                                                        size="small"
                                                        onClick={() => {
                                                            setEditItem(s);
                                                            setOpenDialog(true);
                                                        }}
                                                        sx={{ mr: 1 }}
                                                    >
                                                        Edit
                                                    </Button>

                                                    <Button
                                                        variant="outlined"
                                                        color="error"
                                                        size="small"
                                                        onClick={() => handleDelete(s)}
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

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Edit {view === "students" ? "Student" : view === "society" ? "Society" : "Posts"}</DialogTitle>

                <DialogContent>
                    {view === "students" && editItem && (
                        <>
                            <TextField
                                label="Username"
                                fullWidth
                                margin="dense"
                                value={editItem.username}
                                onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                            />

                            <TextField
                                label="Email"
                                fullWidth
                                margin="dense"
                                value={editItem.email}
                                onChange={(e) => setEditItem({ ...editItem, email: e.target.value })}
                            />

                            <TextField
                                label="Phone Number"
                                fullWidth
                                margin="dense"
                                value={editItem.phoneNum}
                                onChange={(e) => setEditItem({ ...editItem, phoneNum: e.target.value })}
                            />
                        </>
                    )}

                    {view === "societies" && editItem && (
                        <>
                            <TextField
                                label="Society Name"
                                fullWidth
                                margin="dense"
                                value={editItem.socName}
                                onChange={(e) => setEditItem({ ...editItem, socName: e.target.value })}
                            />

                            <TextField
                                label="Society Owner"
                                fullWidth
                                margin="dense"
                                value={editItem.socOwner}
                                onChange={(e) => setEditItem({ ...editItem, socOwner: e.target.value })}
                            />
                        </>
                    )}

                    {view === "posts" && editItem && (
                        <>
                            <TextField
                                label="Title"
                                fullWidth
                                margin="dense"
                                value={editItem.title}
                                onChange={(e) => setEditItem({ ...editItem, title: e.target.value })}
                            />
                        </>
                    )}
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSave}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
