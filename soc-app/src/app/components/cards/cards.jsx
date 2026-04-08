import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Link from 'next/link';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useRouter } from 'next/navigation';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { useSession } from 'next-auth/react';

/**
 * Returns human-readable relative time
 */
function timeSincePost(value) {
  const postTime =
    value instanceof Date ? value.getTime() : new Date(value).getTime();

  if (Number.isNaN(postTime)) return 'just now';

  const secondsElapsed = Math.max(
    0,
    Math.floor((Date.now() - postTime) / 1000)
  );

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(secondsElapsed / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count === 1 ? '' : 's'} ago`;
    }
  }

  return 'just now';
}

export function MediaCard({ postId, _id, userID, username, timePosted, title, likes, comments, profilePic, image, likedBy }) {
  const router = useRouter();
  const { data: session } = useSession();
  const id = postId || _id;
  const profileTarget = userID || username;
  const currentUserId = String(session?.user?.id || '');
  const [likesCount, setLikesCount] = React.useState(Math.max(0, parseInt(likes, 10) || 0));
  const [isLiked, setIsLiked] = React.useState(
    Array.isArray(likedBy) && currentUserId
      ? likedBy.map((value) => String(value)).includes(currentUserId)
      : false
  );
  const [isLoadingLike, setIsLoadingLike] = React.useState(false);
  const commentsCount = Math.max(0, parseInt(comments, 10) || 0);

  React.useEffect(() => {
  
    setLikesCount(Math.max(0, parseInt(likes, 10) || 0));
    setIsLiked(
      Array.isArray(likedBy) && currentUserId
        ? likedBy.map((value) => String(value)).includes(currentUserId)
        : false
    );
  }, [likes, likedBy, currentUserId]);

  async function handleLikeClick(e) {
    e.stopPropagation();

    if (!id || !currentUserId || isLoadingLike) return;
    setIsLoadingLike(true);

    try {
      //Back end likes the post 
      const res = await fetch('/api/post/toggleLike', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: String(id) }),
      });

      const payload = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(payload?.error || 'Failed to toggle like');
      }

      //uses the db to reflect the number of post 
      setIsLiked(!!payload?.isLiked);
      setLikesCount(Math.max(0, parseInt(payload?.likes, 10) || 0));
    } catch (error) {
      console.error('Toggle like failed', error);
    } finally {
      setIsLoadingLike(false);
    }
  }

  return (
    <Card
      elevation={0}
      onClick={() => id && router.push(`/viewpost/${id}`)}
      sx={{
        mb: 2,
        backgroundColor: 'transparent',
        boxShadow: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.06)',
        },
      }}
    >
      <Box
        sx={{
          px: 2,
          pt: 1.5,
          pb: 0.5,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Avatar
          src={profilePic}
          sx={{ width: 32, height: 32, bgcolor: '#0079d3' }}
        > {!profilePic && username?.charAt(0)?.toUpperCase()}
        </Avatar>

        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, flexWrap: 'wrap' }}>
          <Typography
            variant="subtitle2"
            component="span"
            sx={{ fontWeight: 600, fontSize: '0.875rem' }}
          >
            {profileTarget ? (
              <Link
                href={`/profile/${encodeURIComponent(profileTarget)}`}
                onClick={(e) => e.stopPropagation()}
                style={{ color: 'inherit', textDecoration: 'none' }}
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
            sx={{ color: '#818384', fontSize: '0.75rem' }}
          >
            • {timeSincePost(timePosted)}
          </Typography>
        </Box>
      </Box>

      <CardContent sx={{ px: 2, pt: 0.5, pb: 0.75 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>{title}</Typography>
      </CardContent>

      {image ? (
        <Box sx={{ px: 2, pb: 1 }}>
          <Box
            component="img"
            src={image}
            alt={title || 'post image'}
            sx={{
              width: '100%',
              height: 400,
              objectFit: 'cover',
              borderRadius: 1,
              display: 'block',
              backgroundColor: 'rgba(0,0,0,0.02)',
            }}
          />
        </Box>
      ) : null}

      <CardActions
        sx={{
          display: 'flex',
          gap: 0.5,
          px: 0.2,
          py: 0.5,
          borderTop: '1px solid #e0e0e0',
        }}
      >
        <IconButton
          size="small"
          sx={{ color: isLiked ? '#1976d2' : '#818384' }}
          onClick={handleLikeClick}
          disabled={!currentUserId || isLoadingLike || isLiked}
        >
          <ThumbUpIcon sx={{ fontSize: '1.2rem', mr: 0.5 }} />
          <Typography variant="caption">{likesCount}</Typography>
        </IconButton>

        <IconButton size="small" sx={{ color: '#818384' }} onClick={(e) => e.stopPropagation()}>
          <ChatBubbleOutlineIcon sx={{ fontSize: '1.2rem', mr: 0.5 }} />
          <Typography variant="caption">{commentsCount}</Typography>
        </IconButton>
      </CardActions>
    </Card>
  );
}

export function SocietyCard({ societyID, societyName, membersCount, societyDescription, societyLogo}) {
    const router = useRouter();
  const [isJoining, setIsJoining] = React.useState(false);

  async function handleJoin(e) {
    e.stopPropagation();
    if (isJoining) return;

    setIsJoining(true);
    try {
      const res = await fetch('/api/post/joinSociety', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ societyId: String(societyID || '') }),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload?.error || 'Failed to join society');
      }

      router.push(`/societies/${societyID}`);
    } catch (error) {
      console.error('Join society failed', error);
      alert(error.message || 'Could not join society. Please try again.');
    } finally {
      setIsJoining(false);
    }
  }

    return (
        <>     
        <Card
            elevation={0}
            onClick={() => router.push(`/societies/${societyID}`)}
            sx={{
                mb: 2,
                backgroundColor: 'transparent',
                borderRadius: 4,
                boxShadow: 'none',
                width: '80%',
                height: '150px',
                mx: 'auto',
                border: '2px solid #7777774d',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
                '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.06)',
                },
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar
                        src={societyLogo}
                        alt="Society Icon"
                        sx={{ width: 56, height: 56 }}
                    />
                    <Box>
                        <Typography variant='h5'>
                            <b>{societyName}</b>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {membersCount} Members
                        </Typography>
                    </Box>
                </Box>
                    <Button
                      variant="contained"
                      endIcon={<TrendingFlatIcon />}
                      onClick={handleJoin}
                      disabled={isJoining}
                    >
                      {isJoining ? 'Joining...' : 'Join society'}
                    </Button>
            </Box>

            <Box sx={{ px: 2, pb: 2 }}>
                <Typography>
                    {societyDescription}
                </Typography>
            </Box>
        </Card>
        </>
    );
}
