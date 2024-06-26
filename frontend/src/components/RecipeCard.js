import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

export default function RecipeCard({ title, image, linkTo }) {
  return (
    <Link to={linkTo} style={{ textDecoration: 'none' }}>
      <Card style={{ 
        height: '280px', 
        backgroundColor: 'rgba(246, 244, 210, 0.3)',
        border: '3px solid #D4E09B', 
        boxShadow: 'none',
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between' 
      }}>
        <CardActionArea style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', padding: '16px' }}>
          <div style={{
              height: '60%', 
              width: '100%', 
              overflow: 'hidden', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              borderRadius: '4px', 
              marginTop: '8px', 
            }}>
            <CardMedia
              component="img"
              style={{
                height: '120%', 
                maxWidth: '120%', 
                objectFit: 'cover'
              }}
              image={image}
              alt={title}
            />
          </div>
          <CardContent style={{ width: '100%' }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 700,
                fontSize: '14px',
                textTransform: 'uppercase',
                color: '#03071E',
              }}
            >
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
