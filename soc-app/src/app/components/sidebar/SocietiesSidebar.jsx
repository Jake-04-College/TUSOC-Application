"use client";

import * as React from "react";
import Link from "next/link";
import { Box, Typography } from "@mui/material";

export default function SocietiesSidebar() {
    const [title, setTitle] = React.useState("Suggested Societies");
    const [societies, setSocieties] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        let isMounted = true;

        async function loadSidebarSocieties() {
            try {
                const res = await fetch("/api/get/getSidebarSocieties", { cache: "no-store" });
                if (!res.ok) throw new Error("Failed to load societies");

                const data = await res.json();
                if (!isMounted) return;

                setTitle(data?.title || "Suggested Societies");
                setSocieties(Array.isArray(data?.societies) ? data.societies : []);
            } catch (error) {
                console.error("Failed to load sidebar societies", error);
                if (!isMounted) return;
                setTitle("Suggested Societies");
                setSocieties([]);
            } finally {
                if (isMounted) setIsLoading(false);
            }
        }

        loadSidebarSocieties();
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                {title}
            </Typography>

            {isLoading ? (
                <Typography variant="body2" color="text.secondary">
                    Loading societies...
                </Typography>
            ) : societies.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                    No societies found.
                </Typography>
            ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    {societies.map((society) => (
                        <Box key={society.id || society.name}>
                            {society.id ? (
                                <Link
                                    href={`/societies/${society.id}`}
                                    style={{ textDecoration: "none", color: "inherit" }}
                                >
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                        {society.name}
                                    </Typography>
                                </Link>
                            ) : (
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {society.name}
                                </Typography>
                            )}
                            <Typography variant="caption" color="text.secondary">
                                {Number(society.memberCount) || 0} members
                            </Typography>
                        </Box>
                    ))}
                </Box>
            )}
        </>
    );
}
