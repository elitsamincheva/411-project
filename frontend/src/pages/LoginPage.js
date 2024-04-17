import React from 'react';

function LoginPage() {
    const backgroundStyle = {
        background: 'rgb(241,156,121)',
        background: 'radial-gradient(circle, rgba(241,156,121,1) 0%, rgba(212,224,155,1) 100%)',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const loginButtonStyle = {
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '5px',
        backgroundColor: '#F6F4D2',
        color: '#A44A3F',
        textDecoration: 'none',
        border: 'none',
        cursor: 'pointer',
    };

    return(
        <div style={backgroundStyle}>
            <a href='http://localhost:3000/login' style={loginButtonStyle}>Login Here</a>
        </div>
    );
}

export default LoginPage;
