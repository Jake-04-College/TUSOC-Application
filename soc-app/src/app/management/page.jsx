"use client";

import React from "react";
import {
  Box,
  Container,
  CssBaseline,
  Typography,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import { Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";
import NavBar from "../components/navbar/Navbar";

export default function ManagementPage() {
  const [societies, setSocieties] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

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

  return (
    <>
      <CssBaseline />
      <NavBar />

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
          Management
        </Typography>

        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Societies
              </Typography>
              <Button variant="contained" startIcon={<AddIcon />} size="small">
                Add Society
              </Button>
            </Box>

            <Divider sx={{ mb: 2 }} />

            {isLoading ? (
              <Typography align="center" sx={{ py: 4 }}>
                Loading societies...
              </Typography>
            ) : societies.length === 0 ? (
              <Typography align="center" color="text.secondary" sx={{ py: 4 }}>
                No societies found
              </Typography>
            ) : (
                    <List disablePadding>
                {societies.map((s) => (
                  <ListItem key={s._id} divider secondaryAction={
                    <IconButton edge="end" aria-label="delete" color="error">
                      <DeleteIcon />
                    </IconButton>
                  }>
                    <ListItemText
                      primary={s.Soc_Name || s.name}
                      secondary={`${s.Member_Count || s.memberCount || 0} members — ${s.Soc_Desc || s.SocDesc || s.description || "No description"}`}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
