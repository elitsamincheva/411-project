import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import spotify_logo from '../images/spotify_logo.png';

function LoginPage() {
    const [typedText, setTypedText] = useState('');
    const [textToType, setTextToType] = useState('Recipe and Playlist Generator');
    const [charIndex, setCharIndex] = useState(0);
    const typingSpeed = 100; // Delay between each character (in milliseconds)

    useEffect(() => {
        const timer = setInterval(() => {
            if (charIndex < textToType.length) {
                setTypedText(prevText => prevText + textToType.charAt(charIndex));
                setCharIndex(prevIndex => prevIndex + 1);
            } else {
                clearInterval(timer);
            }
        }, typingSpeed);

        return () => clearInterval(timer);
    }, [charIndex, textToType]);

    const backgroundStyle = {
        background: 'radial-gradient(circle, rgba(241,156,121,1) 0%, rgba(212,224,155,1) 100%)',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const buttonContainerStyle = {
        display: 'flex',
        gap: '20px',
        marginTop: '50px',
    };

    const headingContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginBottom: '20px',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const titleStyle = {
        fontSize: '64px',
        color: '#F6F4D2',
        fontFamily: 'Poppins, sans-serif',
        margin: '10px',
    };

    const subTitleStyle = {
        fontSize: '21px',
        color: '#F6F4D2',
        fontFamily: '"Roboto Mono", monospace',
        margin: '0px',
    };

    const loginButtonStyle = {
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '30px',
        backgroundColor: '#000',
        color: '#F6F4D2',
        textDecoration: 'none',
        border: 'none',
        cursor: 'pointer',
        fontFamily: '"Roboto Mono", monospace',
        transition: 'background-color 0.3s ease',
        '&:hover': {
            backgroundColor: '#1ED760',
        },
    };

    return (
        <div style={backgroundStyle}>
            <div style={headingContainerStyle}>
                <h1 style={titleStyle}>BeatBite</h1>
                <h2 style={subTitleStyle}>{typedText}</h2>
            </div>
            <div style={buttonContainerStyle}>
                <Button component={Link} to='http://localhost:3000/login' variant="contained" style={loginButtonStyle}>
                    <span> Login with Spotify </span>
                    <img src={spotify_logo} alt="Spotify Logo" style={{ width: '30px', marginLeft: '10px' }} />
                </Button>
            </div>
        </div>
    );
}

export default LoginPage;
