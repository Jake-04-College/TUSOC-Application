import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SSOLoginButton, LoginButton, RedirectButton } from './components/buttons/buttons';

export default function StartPage() {
    return(

    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <Typography variant="h4" component="h1" gutterBottom>
            Welcome to the TU Dublin Sociery Portal
        </Typography>
            <LoginButton text="Login" link="/login" />
            <SSOLoginButton/>
            <RedirectButton text="Sign up with Credentials" link="/register" />
    </Box>
)}