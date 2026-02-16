import { SessionProvider } from "next-auth/react";

export const metadata = {
    title: 'SOC Media Feed',
    description: 'Home feed for SOC posts',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body style={{ margin: 0, fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f5f5f5' }}>
                <SessionProvider>
                {children}
                </SessionProvider>
            </body>
        </html>
    );
}
