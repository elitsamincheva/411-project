import React from 'react'; // Import React library
import Card from '@mui/material/Card'; // Import Card component from Material-UI
import CardContent from '@mui/material/CardContent'; // Import CardContent component from Material-UI
import CardMedia from '@mui/material/CardMedia'; // Import CardMedia component from Material-UI
import Typography from '@mui/material/Typography'; // Import Typography component from Material-UI
import { CardActionArea } from '@mui/material'; // Import CardActionArea component from Material-UI

// Functional component for displaying a recipe card
export default function RecipeCard({ title, image }) {
  return (
    <Card> {/* Outer card container */}
      <CardActionArea> {/* Actionable area for the card */}
        <CardMedia
          component="img" // Media component type
          height="140" // Height of the media
          image={image} // Image source
          alt={title} // Alt text for accessibility using the title
        />
        <CardContent> {/* Content area of the card */}
          <Typography gutterBottom variant="h5" component="div">
            {title} {/* Title of the recipe */}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
