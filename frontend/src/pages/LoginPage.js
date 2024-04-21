import React from 'react';
import { signInWithGoogle } from '../Firebase';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material'; 
import  spotify_logo from '/Users/sammaguire/Desktop/411-project/frontend/src/pages/spotify_logo.png'

function LoginPage() {

    const backgroundStyle = {
        background: 'rgb(241,156,121)',
        background: 'radial-gradient(circle, rgba(241,156,121,1) 0%, rgba(212,224,155,1) 100%)',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column', // arrange in components in column
        justifyContent: 'center',
        alignItems: 'center',
    };


    const buttonContainerStyle = {
        display: 'flex',
        gap: '20px', // Adjust the gap between buttons
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
        fontSize: '62px',
        color: '#fff',
        color: '#A44A3F',
        fontFamily: '"Roboto Mono", monospace',
        margin: '0px',
    };

    const subTitleStyle = {
        fontSize: '30px',
        fontWeight: '200',
        color: '#A44A3F',
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
        transition: 'background-color 0.3s ease', // Add smooth transition
        '&:hover': {
            backgroundColor: '#1ED760', // Darker color on hover
        },
    };
    
    const HomeButtonStyle = {
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '30px',
        backgroundColor: '#F6F4D2',
        color: '#A44A3F',
        textDecoration: 'none',
        border: 'none',
        cursor: 'pointer',
        fontFamily: '"Roboto Mono", monospace',
    };

    return(
        <div style={backgroundStyle}>
            {/* Title of the website */}
          <div style={headingContainerStyle}>  
            <h1 style={titleStyle}>BeatBite</h1>
            <h2 style={subTitleStyle} >Listen to your food</h2>
        </div>
         <div style={buttonContainerStyle}>
                {/* Login button with Spotify logo */}
                <Button component={Link} to='/login' variant="contained" style={loginButtonStyle}>
                    <span> Login with Spotify </span>
                    <img src={spotify_logo} alt="Spotify Logo" style={{ width: '30px', marginLeft: '10px' }} />
                </Button>
                {/* Home button */}
                <Button component={Link} to='/' variant="contained" style={HomeButtonStyle}>Home</Button>
            </div>
        </div>

   );
}

export default LoginPage;
