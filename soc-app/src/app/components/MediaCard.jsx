import Card from '@mui/materials/Card';
import CardContent from '@mui/materials/CardContent';
import CardHeader from '@mui/materials/CardHeader';
import CardActions from '@mui/materials/CardActions';
import Typography from '@mui/materials/Typography';

function timeSincePost(date){
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000)

    const timeIntervals= [
        {label: "year", seconds:31536000},
        {label: "month", seconds:2592000},
        {label: "day", seconds:86400},
        {label: "hour", seconds:3600},
        {label: "minute", seconds:60}
    ]

    for(const timeInterval of timeIntervals){
        const count = Math.floor(seconds / timeInterval.seconds)
    }
    return `${count} ${timeInterval.label}${count > 1 ? 's' : ''} ago`
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
