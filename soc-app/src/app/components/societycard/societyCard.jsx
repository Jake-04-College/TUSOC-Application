import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

export default function SocietyCard() {
  return (
    <Card
      elevation={0}
      sx={{
        mb: 2,
        backgroundColor: 'transparent',
        borderRadius: 4,
        boxShadow: 'none',
        width: '800px',
        height: '150px',
        mx: 'auto',
        border: '2px solid #7777774d'
      }}
    >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar 
                    src="https://cdn-icons-png.flaticon.com/512/2492/2492986.png" 
                    alt="Society Icon"
                    sx={{ width: 56, height: 56 }}
                />
                <Box>
                    <Typography variant='h5'>
                       <b>Example Society</b> 
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        X Members
                    </Typography>
                </Box>
            </Box>
            <Button variant="contained">
                Join Society
            </Button>
        </Box>

        <Box sx={{ px: 2, pb: 2 }}>
            <Typography>
               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            </Typography>
        </Box>
    </Card>
  );
}
