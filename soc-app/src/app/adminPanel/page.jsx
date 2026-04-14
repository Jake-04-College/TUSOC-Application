"use client";

import * as React from "react";
import {AppBar, Box, Button, CssBaseline, Toolbar, Typography, Grid } from "@mui/material";
import {Dialog, DialogTitle, DialogContent, TextField, DialogActions} from "@mui/material";

export default function AdminPanel() {
    const [view, setView] = React.useState("students");
    const [students, setStudents] = React.useState([]);
    const [societies, setSocieties] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [editItem, setEditItem] = React.useState(null);
    const [openDialog, setOpenDialog] = React.useState(false);

    // gets students/societies from db
    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                if (view === "students"){
                    const res = await fetch(""); // add get students api
                    const data = await res.json();
                    setStudents(data);
                }
                else if (view === "societies"){
                    const res = await fetch(""); // add get societies api
                    const data = await res.json();
                    setSocieties(data);
                }
            }
            catch (err){
                console.error(err);
            }
            setLoading(false);
        };
        fetchData();
    }, [view]);

    // save changes made
    const handleSave = async () => {
        try{
            const endpoint =
                view === "students"
                    ? `/api/students/${editItem.id}`
                    : `/api/societies/${editItem.id}`;

            await fetch(endpoint, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(editItem)
            });

            if (view === "students"){
                setStudents((prev) =>
                    prev.map((s) => (s.id === editItem.id ? editItem : s))
                );
            }
            else{
                setSocieties((prev) =>
                    prev.map((s) => (s.id === editItem.id ? editItem : s))
                );
            }
            setOpenDialog(false);
        }
        catch (err){
            console.error(err);
        }
    };

    return (
        <>
            <CssBaseline />

            <AppBar position="static">
                <Typography variant="h5">Administration Panel</Typography>
                <Toolbar/>
            </AppBar>

            {/* side bar that has student and society buttons */}
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
                    </Box>
                </Grid>

                
                {/* main area that displays students/societies as a list */}
                {/* allows edits to be made to each entry */}
                {/* need to add filter/search bar for later */}
                
                <Grid item xs={12} md={9} sx={{ p: 3 }}>
                    {loading && <Typography>Loading...</Typography>}

                    {!loading && view === "students" && (
                        <Box>
                            <Typography variant="h6">Students</Typography>
                            {students.map((s) => (
                                <Box key={s.id} display="flex" justifyContent="space-between" mb={1}>
                                    <Typography>
                                        {s.name} ({s.email})
                                    </Typography>

                                    <Button variant="outlined" onClick={() => {
                                        setEditItem(s);
                                        setOpenDialog(true);
                                    }}>
                                        Edit
                                    </Button>
                                </Box>
                            ))}
                        </Box>
                    )}

                    {!loading && view === "societies" && (
                        <Box>
                            <Typography variant="h6">Societies</Typography>
                            {societies.map((s) => (
                                <Box key={s.id} display="flex" justifyContent="space-between" mb={1}>
                                    <Typography>{s.name}</Typography>

                                    <Button variant="outlined" onClick={() => {
                                        setEditItem(s);
                                        setOpenDialog(true);
                                    }}>
                                        Edit
                                    </Button>
                                </Box>
                            ))}
                        </Box>
                    )}
                </Grid>
            </Grid>

            
            {*/ for editing student/society */}
            {*/ need to review it once db/api is connected */}
            
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Edit {view === "students" ? "Student" : "Society"}</DialogTitle>

                <DialogContent>
                    {view === "students" && editItem && (
                        <>
                            <TextField
                                label="Name"
                                fullWidth
                                margin="dense"
                                value={editItem.name}
                                onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                            />

                            <TextField
                                label="Email"
                                fullWidth
                                margin="dense"
                                value={editItem.email}
                                onChange={(e) => setEditItem({ ...editItem, email: e.target.value })}
                            />
                        </>
                    )}

                    {view === "societies" && editItem && (
                        <TextField
                            label="Name"
                            fullWidth
                            margin="dense"
                            value={editItem.name}
                            onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                        />
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
