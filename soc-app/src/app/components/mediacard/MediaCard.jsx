import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
<<<<<<< HEAD:soc-app/src/app/components/MediaCard.jsx
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
=======
>>>>>>> cd72d2b3effa7cee86f7b734e61ee7a7401fb094:soc-app/src/app/components/mediacard/MediaCard.jsx
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

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

<<<<<<< HEAD:soc-app/src/app/components/MediaCard.jsx
  return 'just now';
}

export default function MediaCard({
  username,
  timePosted,
  title,
  likes,
  comments,
  profilePic,
  image,
}) {
  const likesCount = parseInt(likes, 10) || 0;
  const commentsCount = parseInt(comments, 10) || 0;

  return (
    <Card
      elevation={0}
      sx={{
        mb: 2,
        
        backgroundColor: 'transparent',
        boxShadow: 'none',
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
        >
          {!profilePic && username?.charAt(0)?.toUpperCase()}
        </Avatar>

        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, flexWrap: 'wrap' }}>
          <Typography
            variant="subtitle2"
            component="span"
            sx={{ fontWeight: 600, fontSize: '0.875rem' }}
          >
            {username}
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
        <IconButton size="small" sx={{ color: '#818384' }}>
          <ThumbUpIcon sx={{ fontSize: '1.2rem', mr: 0.5 }} />
          <Typography variant="caption">{likesCount}</Typography>
        </IconButton>

        <IconButton size="small" sx={{ color: '#818384' }}>
          <ChatBubbleOutlineIcon sx={{ fontSize: '1.2rem', mr: 0.5 }} />
          <Typography variant="caption">{commentsCount}</Typography>
        </IconButton>
      </CardActions>
    </Card>
  );
=======
export default function MediaCard({ username, timePosted, title, likes, comments, profilePic }) {
    const likesCount = parseInt(likes, 10) || 0;
    const commentsCount = parseInt(comments, 10) || 0;

    return (
        <Card sx={{ mb: 2, border: '1px solid #e0e0e0', '&:hover': { boxShadow: '0 2px 8px rgba(0,0,0,0.1)' } }}>
            <Box sx={{ px: 2, pt: 1.5, pb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar src={profilePic} sx={{ width: 32, height: 32, bgcolor: '#0079d3' }}>
                    {!profilePic && username?.charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                        {username}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#818384', fontSize: '0.75rem' }}>
                        {timeSincePost(timePosted)}
                    </Typography>
                </Box>
            </Box>

            <CardContent sx={{ px: 2, py: 1 }}>
                <Typography variant="h6" sx={{ fontSize: '2.125rem' }}>
                    {title}
                </Typography>
            </CardContent>

            <Box sx={{ display: 'flex', gap: 0.5, px: 1, py: 0.5, borderTop: '1px solid #e0e0e0' }}>
                <IconButton size="small" sx={{ color: '#818384' }}>
                    <ThumbUpIcon sx={{ fontSize: '1.2rem', mr: 0.5 }} />
                    <Typography variant="caption">{likesCount}</Typography>
                </IconButton>

                <IconButton size="small" sx={{ color: '#818384' }}>
                    <ChatBubbleOutlineIcon sx={{ fontSize: '1.2rem', mr: 0.5 }} />
                    <Typography variant="caption">{commentsCount}</Typography>
                </IconButton>
            </Box>
        </Card>
    );
>>>>>>> cd72d2b3effa7cee86f7b734e61ee7a7401fb094:soc-app/src/app/components/mediacard/MediaCard.jsx
}
