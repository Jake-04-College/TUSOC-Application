"use client";

import { useRouter } from "next/navigation";
import { Avatar, Box, Button, Card, CardContent, Container, Stack, Typography } from "@mui/material";
import { MediaCard } from "../../../components/cards/cards.jsx";

export default function ProfileClient({ userData, posts, session }) {
  const router = useRouter();

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 4, p: 2 }}>
        <CardContent>
          <Stack spacing={2} alignItems="center">
            <Avatar src={session?.user?.image || ""} sx={{ width: 100, height: 100 }} />
            <Typography variant="h5">{userData.username}</Typography>

            <Typography color="text.secondary">{userData.courseCode ?? ""}</Typography>

            {session?.user?.id === userData.id && (
              <Button variant="contained" onClick={() => router.push("/editProfile")}>
                Edit Profile
              </Button>
            )}
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
              username={post.username}
              timePosted={post.timePosted}
              title={post.title}
              image={post.image}
              likes={post.likes}
              comments={post.comments}
              profilePic={post.profilePic}
            />
          ))
        )}
      </Box>
    </Container>
  );
}
