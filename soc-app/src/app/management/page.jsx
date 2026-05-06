"use client";

import React from "react";
import {
  Box,
  Container,
  CssBaseline,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  TextField,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Group as GroupIcon,
  People as PeopleIcon,
  Article as ArticleIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";
import NavBar from "../components/navbar/Navbar";

export default function ManagementPage() {
  const [societies, setSocieties] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [openDialog, setOpenDialog] = React.useState(false);

  React.useEffect(() => {
    async function fetchSocieties() {
      try {
        const res = await fetch("/api/get/getSocietys");
        if (!res.ok) throw new Error("Failed to load societies");
        const data = await res.json();
        setSocieties(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch societies:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSocieties();
  }, []);

  const stats = [
    {
      title: "Total Societies",
      value: societies.length || 0,
      icon: GroupIcon,
      color: "#2196F3",
    },
    {
      title: "Active Members",
      value: societies.reduce((sum, s) => sum + (s.Member_Count || 0), 0),
      icon: PeopleIcon,
      color: "#4CAF50",
    },
    {
      title: "Posts",
      value: "128",
      icon: ArticleIcon,
      color: "#FF9800",
    },
    {
      title: "Growth",
      value: "+24%",
      icon: TrendingUpIcon,
      color: "#9C27B0",
    },
  ];

  return (
    <>
      <CssBaseline />
      <NavBar />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
            Admin Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage societies, members, and platform activity
          </Typography>
        </Box>

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, index) => {
            const StatIcon = stat.icon;
            return (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
                    },
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 2,
                      }}
                    >
                      <Typography color="text.secondary" variant="body2">
                        {stat.title}
                      </Typography>
                      <Box
                        sx={{
                          p: 1,
                          backgroundColor: `${stat.color}20`,
                          borderRadius: 2,
                        }}
                      >
                        <StatIcon sx={{ color: stat.color }} />
                      </Box>
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      {stat.value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {/* Societies Management */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Societies Management
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenDialog(true)}
              >
                Add Society
              </Button>
            </Box>

            {isLoading ? (
              <Typography align="center" sx={{ py: 4 }}>
                Loading societies...
              </Typography>
            ) : (
              <TableContainer component={Paper} sx={{ boxShadow: "none", border: "1px solid #e0e0e0" }}>
                <Table>
                  <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Society Name</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Members</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Description</TableCell>
                      <TableCell sx={{ fontWeight: 700 }} align="right">
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {societies.length > 0 ? (
                      societies.map((society) => (
                        <TableRow
                          key={society._id}
                          sx={{
                            "&:hover": {
                              backgroundColor: "#f9f9f9",
                            },
                          }}
                        >
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                              <Box
                                sx={{
                                  width: 40,
                                  height: 40,
                                  borderRadius: "50%",
                                  backgroundColor: "#2196F3",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  color: "white",
                                  fontWeight: 700,
                                }}
                              >
                                {society.Soc_Name?.charAt(0).toUpperCase()}
                              </Box>
                              <Typography sx={{ fontWeight: 600 }}>
                                {society.Soc_Name}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={`${society.Member_Count || 0} members`}
                              size="small"
                              color="primary"
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell sx={{ maxWidth: 300 }}>
                            <Typography variant="body2" noWrap>
                              {society.Soc_Desc || "No description"}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <IconButton
                              size="small"
                              color="primary"
                              title="Edit"
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="error"
                              title="Delete"
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                          <Typography color="text.secondary">
                            No societies found
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>

        {/* Add Society Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Add New Society
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                fullWidth
                label="Society Name"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                multiline
                rows={3}
              />
              <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                <Button onClick={() => setOpenDialog(false)} variant="outlined">
                  Cancel
                </Button>
                <Button variant="contained">Create</Button>
              </Box>
            </Box>
          </Box>
        </Dialog>
      </Container>
    </>
  );
}
