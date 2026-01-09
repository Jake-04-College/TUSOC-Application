import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';

function timeSincePost(date){
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

    const timeIntervals= [
        {label: "year", seconds:31536000},
        {label: "month", seconds:2592000},
        {label: "day", seconds:86400},
        {label: "hour", seconds:3600},
        {label: "minute", seconds:60}
    ]

    for(const timeInterval of timeIntervals){
        const count = Math.floor(seconds / timeInterval.seconds)
        if (count >= 1){
            return `${count} ${timeInterval.label}${count > 1 ? 's' : ''} ago`;
        }
    }
    return "a few seconds ago";
}

export default function MediaCard({username, timePosted, title, likes, comments}){
    return (
        <Card sx={{maxWidth: 500, mb: 2}}>
            <CardHeader title={username} subheader={timeSincePost(new Date(timePosted))}/>

            <CardContent>
                <Typography variant="h6">{title}</Typography>
            </CardContent>

            <CardActions>
                <Typography variant="body2">Likes: {likes}</Typography>
                <Typography variant="body2">Comments: {comments}</Typography>
            </CardActions>
        </Card>
    )
}
