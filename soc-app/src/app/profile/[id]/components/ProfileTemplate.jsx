"use client";

import { useRouter } from "next/navigation";
import { Avatar, Box, Button, Card, CardContent, Container, Stack, Typography } from "@mui/material";
import { MediaCard } from "../../../components/cards/cards.jsx";
import Navbar from "../../../components/navbar/Navbar";

export default function ProfileClient({ userData, posts, session }) {
  const router = useRouter();
  const sessionUsername = String(session?.user?.username || session?.user?.name || "").trim().toLowerCase();
  const viewedUsername = String(userData?.username || "").trim().toLowerCase();
  const isOwnProfile = (
    (session?.user?.id && userData?._id && String(session.user.id) === String(userData._id)) ||
    (sessionUsername && viewedUsername && sessionUsername === viewedUsername)
  );
  const avatarSrc = userData?.profilePic || userData?.image || (isOwnProfile ? (session?.user?.image || "") : "");

  return (
    <>
      <Navbar />
      <Container maxWidth="sm">
        <Card sx={{ mt: 4, p: 2 }}>
          <CardContent>
            <Stack spacing={2} alignItems="center">
              <Avatar src={avatarSrc} sx={{ width: 100, height: 100 }}>
                {!avatarSrc && userData?.username?.charAt(0)?.toUpperCase()}
              </Avatar>
              <Typography variant="h5">{userData.username}</Typography>

              <Typography color="text.secondary">{userData.courseCode ?? ""}</Typography>

              {isOwnProfile ? (
                <Button variant="contained" onClick={() => router.push("/editProfile")}>
                  Edit Profile
                </Button>
              ) : null}
            </Stack>
          </CardContent>
        </Card>

        <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="h4" align="center" sx={{ mb: 2 }}>
            {userData.username}&apos;s Posts
          </Typography>

          {posts.length === 0 ? (
            <Typography align="center">No posts yet.</Typography>
          ) : (
            posts.map((post) => (
              <MediaCard
                key={post._id}
                postId={post._id}
                userID={post.userID}
                username={post.username}
                timePosted={post.timePosted}
                title={post.title}
                image={post.image}
                likes={post.likes}
                likedBy={post.likedBy}
                comments={post.comments}
                profilePic={post.profilePic}
              />
            ))
          )}
        </Box>
      </Container>
    </>
  );
}
