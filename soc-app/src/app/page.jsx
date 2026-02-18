"use client";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import { SSOLoginButton, LoginButton, RedirectButton } from './components/buttons/buttons';
import ImageIcon from '@mui/icons-material/Image';
import { Divider } from '@mui/material';

export default function StartPage() {
    return (
        <>
            <CssBaseline />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                backgroundColor: '#121212',
            }}>
                <Box sx={{
                    border: 2,
                    margin: 2,
                    padding: 3,
                    borderColor: 'rgba(255, 255, 255, 0.12)',
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    borderRadius: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    maxWidth: 400,
                }}>
                    <ImageIcon sx={{ fontSize: 64, color: 'rgba(255, 255, 255, 0.7)'}} />
                    <Typography variant="h4" component="h1" sx={{ color: 'rgba(255, 255, 255, 0.7)'}}>
                    TU Dublin Society Portal
                    </Typography>
                    <Divider sx={{ my: 1 , borderColor: 'rgba(65, 65, 65, 0.12)' }} />
                    <Typography variant="body1" align="center" sx={{ mb: 2, color: 'rgb(255, 255, 255)' }}>
                        Connect with your fellow students, share your experiences, and stay updated on campus events.
                    </Typography>
                    <Divider sx={{ my: 1, borderColor: 'rgba(255, 255, 255, 0.12)', }} />
                    <LoginButton text="Login" link="/login" sx={{ color: "rgba(255, 255, 255, 0.7)"}} />
                    <Divider sx={{ my: 1, borderColor: 'rgba(255, 255, 255, 0.12)' }} />
                    <SSOLoginButton/>
                    <Divider sx={{ my: 1, borderColor: 'rgba(255, 255, 255, 0.12)' }} />
                    <RedirectButton text="Sign up with Credentials" link="/register" />
                </Box>
                
            </Box>
            </>

    )
}