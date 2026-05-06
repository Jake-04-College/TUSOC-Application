import "server-only";
export const runtime = "nodejs";

import { notFound } from "next/navigation";
import clientPromise from "../../lib/mongoConnection";
import { ObjectId } from "mongodb";
import Link from "next/link";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Navbar from "../components/navbar/Navbar";
import SocietiesSidebar from "../components/sidebar/SocietiesSidebar";

function timeSincePost(value) {
    const postTime =
        value instanceof Date ? value.getTime() : new Date(value).getTime();

    if (Number.isNaN(postTime)) return "just now";

    const secondsElapsed = Math.max(
        0,
        Math.floor((Date.now() - postTime) / 1000)
    );

    const intervals = [
        { label: "year", seconds: 31536000 },
        { label: "month", seconds: 2592000 },
        { label: "day", seconds: 86400 },
        { label: "hour", seconds: 3600 },
        { label: "minute", seconds: 60 },
    ];

    for (const interval of intervals) {
        const count = Math.floor(secondsElapsed / interval.seconds);
        if (count >= 1) {
            return `${count} ${interval.label}${count === 1 ? "" : "s"} ago`;
        }
    }

    return "just now";
}

export default async function ExpandPostPage({ searchParams }) {
    const resolvedSearchParams = await searchParams;
    const postId = String(resolvedSearchParams?.id || "").trim();

    if (!postId || !ObjectId.isValid(postId)) {
        notFound();
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);

    const post = await db.collection("UserPosts").findOne({ _id: new ObjectId(postId) });

    if (!post) {
        notFound();
    }

    const likesCount = parseInt(post.likes, 10) || 0;
    const commentsCount = parseInt(post.comments, 10) || 0;
    const title = post.title || "Untitled Post";
    const body = post.body || "";
    const username = post.username || "Anonymous";
    const profileIdentifier = post.userID || post.username || "";
    const profilePic = post.profilePic || "";
    const image = post.image || "";

    return (
        <>
            <Navbar />
            <Container maxWidth="lg">
                <Box
                sx={{
                    mt: 2,
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "200px 1fr 200px" },
                    gap: { xs: 3, md: 3 },
                    alignItems: "stretch",
                    minHeight: "100vh",
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
                        minHeight: "100%",
                    }}
                >
                    <SocietiesSidebar />
                </Box>

                <Box sx={{ display: "flex", justifyContent: "center", height: "100%" }}>
                    <Card
                        elevation={0}
                        sx={{
                            width: "100%",
                            maxWidth: 820,
                            backgroundColor: "transparent",
                            boxShadow: "none",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                px: 2,
                                pt: 2,
                            }}
                        >
                            <Avatar src={profilePic} sx={{ width: 36, height: 36, bgcolor: "#0079d3" }}>
                                {!profilePic && username?.charAt(0)?.toUpperCase()}
                            </Avatar>
                            <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, flexWrap: "wrap" }}>
                                <Typography
                                    variant="subtitle2"
                                    component="span"
                                    sx={{ fontWeight: 600, fontSize: "0.9rem" }}
                                >
                                    {profileIdentifier ? (
                                        <Link
                                            href={`/profile/${encodeURIComponent(profileIdentifier)}`}
                                            style={{ color: "inherit", textDecoration: "none" }}
                                        >
                                            {username}
                                        </Link>
                                    ) : (
                                        username
                                    )}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    component="span"
                                    sx={{ color: "#818384", fontSize: "0.75rem" }}
                                >
                                    • {timeSincePost(post.timePosted)}
                                </Typography>
                            </Box>
                        </Box>

                        <CardContent sx={{ px: 2, pt: 1, pb: 1 }}>
                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                                {title}
                            </Typography>
                            <Typography variant="body1" sx={{ color: "#1c1c1c", lineHeight: 1.6 }}>
                                {body}
                            </Typography>
                        </CardContent>

                        {image ? (
                            <Box sx={{ px: 2, pb: 2 }}>
                                <Box
                                    component="img"
                                    src={image}
                                    alt={title}
                                    sx={{
                                        width: "100%",
                                        maxHeight: 460,
                                        objectFit: "cover",
                                        borderRadius: 1,
                                        display: "block",
                                        backgroundColor: "rgba(0,0,0,0.02)",
                                    }}
                                />
                            </Box>
                        ) : null}

                        <CardActions
                            sx={{
                                display: "flex",
                                gap: 0.5,
                                px: 1.5,
                                py: 0.5,
                                borderTop: "1px solid #e0e0e0",
                            }}
                        >
                            <IconButton size="small" sx={{ color: "#818384" }}>
                                <ThumbUpIcon sx={{ fontSize: "1.2rem", mr: 0.5 }} />
                                <Typography variant="caption">{likesCount}</Typography>
                            </IconButton>

                            <IconButton size="small" sx={{ color: "#818384" }}>
                                <ChatBubbleOutlineIcon sx={{ fontSize: "1.2rem", mr: 0.5 }} />
                                <Typography variant="caption">{commentsCount}</Typography>
                            </IconButton>
                        </CardActions>

                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ px: 2, pb: 2 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                                Comments
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#6b6b6b" }}>
                                Comments will appear here.
                            </Typography>
                        </Box>
                    </Card>
                </Box>

                <Box
                    component="aside"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        borderLeft: { xs: "none", md: "1px solid rgba(0, 0, 0, 0.12)" },
                        borderRadius: 2,
                        pl: { xs: 0, md: 2 },
                        height: "100%",
                        minHeight: "100%",
                    }}
                >
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Right Sidebar
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Coming soon.
                    </Typography>
                </Box>
                </Box>
            </Container>
        </>
    );
}
