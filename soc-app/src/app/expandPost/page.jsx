import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

export default function ExpandPostPage() {
    const imageUrl =
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop';

    return (
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
                        borderRight: { xs: "none", md: "1px solid rgba(0,0,0,0.12)" },
                        borderRadius: 2,
                        pr: { xs: 0, md: 2 },
                        bgcolor: "transparent",
                        height: "100%",
                        minHeight: "100%",
                    }}
                >
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Suggested Societies
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Coming soon.
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', height: "100%" }}>
                    <Card
                        elevation={0}
                        sx={{
                            width: '100%',
                            maxWidth: 820,
                            backgroundColor: 'transparent',
                            boxShadow: 'none',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                px: 2,
                                pt: 2,
                            }}
                        >
                            <Avatar sx={{ width: 36, height: 36, bgcolor: '#0079d3' }}>
                                T
                            </Avatar>
                            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, flexWrap: 'wrap' }}>
                                <Typography
                                    variant="subtitle2"
                                    component="span"
                                    sx={{ fontWeight: 600, fontSize: '0.9rem' }}
                                >
                                    example user
                                </Typography>
                                <Typography
                                    variant="caption"
                                    component="span"
                                    sx={{ color: '#818384', fontSize: '0.75rem' }}
                                >
                                    • 35 minutes ago
                                </Typography>
                            </Box>
                        </Box>

                        <CardContent sx={{ px: 2, pt: 1, pb: 1 }}>
                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                                Example of how a post would look
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#1c1c1c', lineHeight: 1.6 }}>
                                this point looks so cool wowee
                            </Typography>
                        </CardContent>

                        {imageUrl ? (
                            <Box sx={{ px: 2, pb: 2 }}>
                                <Box
                                    component="img"
                                    src={imageUrl}
                                    alt="Post image"
                                    sx={{
                                        width: '100%',
                                        maxHeight: 460,
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
                                px: 1.5,
                                py: 0.5,
                                borderTop: '1px solid #e0e0e0',
                            }}
                        >
                            <IconButton size="small" sx={{ color: '#818384' }}>
                                <ThumbUpIcon sx={{ fontSize: '1.2rem', mr: 0.5 }} />
                                <Typography variant="caption">128</Typography>
                            </IconButton>

                            <IconButton size="small" sx={{ color: '#818384' }}>
                                <ChatBubbleOutlineIcon sx={{ fontSize: '1.2rem', mr: 0.5 }} />
                                <Typography variant="caption">24</Typography>
                            </IconButton>
                        </CardActions>

                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ px: 2, pb: 2 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                                Comments
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#6b6b6b' }}>
                                Comments will appear here.
                            </Typography>
                        </Box>
                    </Card>
                </Box>

                <Box
                    component="aside"
                    sx={{
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
    );
}
