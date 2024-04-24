import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import spotify_logo from '../images/Spotify_Icon.png';

function LoginPage() {
    const [typedText, setTypedText] = useState('');
    const [textToType] = useState('Recipe and Playlist Generator');
    const [charIndex, setCharIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const typingSpeed = 100; // Delay between each character (in milliseconds)
    const pauseDuration = 2000;

    useEffect(() => {
        let timer;
        if (!isPaused) {
            timer = setInterval(() => {
                if (charIndex <= textToType.length) {
                    if (charIndex === textToType.length) {
                        setIsPaused(true);
                        setTimeout(() => {
                            setTypedText('');
                            setCharIndex(0);
                            setIsPaused(false);
                        }, pauseDuration);
                    } else {
                        setTypedText(prevText => prevText + textToType.charAt(charIndex));
                        setCharIndex(prevIndex => prevIndex + 1);
                    }
                }
            }, typingSpeed);
        }
        return () => clearInterval(timer);
    }, [charIndex, textToType, isPaused]);

    const styles = {
        background: {
            background: 'radial-gradient(circle, rgba(241,156,121,1) 0%, rgba(212,224,155,1) 100%)',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        buttonContainer: {
            display: 'flex',
            gap: '20px',
            marginTop: '30px',
        },
        headingContainer: {
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginBottom: '20px',
            justifyContent: 'center',
            alignItems: 'center',
        },
        title: {
            fontSize: '64px',
            color: '#F6F4D2',
            fontFamily: 'Poppins, sans-serif',
            margin: '10px',
        },
        subTitle: {
            fontSize: '21px',
            color: '#F6F4D2',
            fontFamily: '"Roboto Mono", monospace',
            margin: '0px',
            height: '21px',
        },
        loginButton: {
            padding: '10px 50px',
            fontSize: '16px',
            fontWeight: 'bold',
            borderRadius: '30px',
            backgroundColor: 'transparent',
            color: '#F6F4D2',
            textDecoration: 'none',
            border: '2px solid #F6F4D2',
            boxShadow: 'none',
            cursor: 'pointer',
            fontFamily: 'Poppins, sans-serif',
            transition: 'background-color 0.3s ease',
        },
    };

    return (
        <div style={styles.background}>
            <div style={styles.headingContainer}>
                <h1 style={styles.title}>BeatBite</h1>
                <h2 style={styles.subTitle}>{typedText}</h2>
            </div>
            <div style={styles.buttonContainer}>
                <Button component={Link} to='http://localhost:3000/login' variant="contained" style={styles.loginButton}>
                    <img src={spotify_logo} alt="Spotify Logo" style={{ width: '21px', marginRight: '10px' }} />
                    <span> Sign in with Spotify </span>
                </Button>
            </div>
        </div>
    );
}

export default LoginPage;
