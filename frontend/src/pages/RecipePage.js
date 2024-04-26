import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as api from '../api';
import { Grid, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const titleStyle = {
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 700, // Adjust weight as needed,
  color: '#50543A',
};

const keywordStyle = {
    ...titleStyle, // Inherit properties from the title style
    fontSize: '14px', // Adjust size as needed
  };

function RecipePage() {
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [playlist, setPlaylist] = useState(null);
    const [showAddToFavs, setShowAddToFavs] = useState(false); // State to control the visibility of the Add to favs button
    const [showGeneratePlaylist, setShowGeneratePlaylist] = useState(true); // State to control the visibility of the Generate Playlist button
    const { recipeId } = useParams();


    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                const recipeDetails = await api.getRecipeDetails(recipeId);
                setRecipe(recipeDetails);
            } catch (error) {
                console.error('Error fetching recipe details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipeDetails();
    }, [recipeId]);

    const handleGeneratePlaylist = async () => {
        console.log('Generating playlist...');
        try {
            const generatedPlaylist = await api.generatePlaylist(recipe.readyInMinutes, recipe.title);
            console.log('Generated playlist:', generatedPlaylist);
            setPlaylist(generatedPlaylist);
            setShowAddToFavs(true); // Show the Add to favs button after generating the playlist
            setShowGeneratePlaylist(false); // Hide the Generate Playlist button after it's clicked
        } catch (error) {
            console.error('Error generating playlist:', error);
        }
    };

    const addToFavorites = async () => {
      try {
        const result = await api.addUserFavorite(recipe, playlist.id);
      } catch(error) {
        console.error('Error adding to favorites: ', error);
      }
    };


    if (loading) {
        return <p>Loading...</p>;
    }

    if (!recipe) {
        return <p>Recipe not found</p>;
    }

    return (
        <Grid container spacing={2} sx={{ padding: '16px' }}>
            <Grid item xs={12} md={8}>
                <Card style={{ 
                    height: '100%',
                    border: '3px solid #D4E09B', 
                    boxShadow: 'none',
                    backgroundColor: 'rgba(246, 244, 210, 0.3)',
                }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" sx={titleStyle}>
                        {recipe.title}
                        </Typography>
                        <CardMedia
                        component="img"
                        style={{ height: 'auto', maxWidth: '100%' , marginBottom: '16px'}}
                        image={recipe.image}
                        alt={recipe.title}
                        />
                        <Typography variant="body2" color="text.secondary" sx={keywordStyle}>
                        Servings: {recipe.servings}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={keywordStyle}>
                        Ready in minutes: {recipe.readyInMinutes}
                        </Typography>
                        <Typography variant="body1">
                        <strong style={keywordStyle}>Instructions:</strong>
                        </Typography>
                        {recipe.analyzedInstructions.map((section, index) => (
                            <div key={index}>
                                <Typography variant="body1" gutterBottom ><strong>{section.name}</strong></Typography>
                                <ol style={keywordStyle}>
                                    {section.steps.map((step) => (
                                        <li key={step.number}>{step.step}</li>
                                    ))}
                                </ol>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}> {/* Adjusted alignment to right */}
                <div>
                    {showGeneratePlaylist && (
                        <Button variant="contained" sx={{
                                        fontFamily: 'Poppins, sans-serif', 
                                        fontWeight: 'bold', 
                                        fontSize: '14px', 
                                        backgroundColor: '#A44A3F', 
                                        color: '#F6F4D2', 
                                        '&:hover': {
                                            backgroundColor: '#6d312a',
                                          },
                                    }} 
                            onClick={handleGeneratePlaylist} style={{marginBottom: '16px'}}>

                            Generate Playlist
                        </Button>
                    )}
                    
                    {playlist && (
                        <div>
                            <iframe style={{ borderRadius: '12px' }} src={`https://open.spotify.com/embed/playlist/${playlist.id}?utm_source=generator`} 
                            width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; 
                            picture-in-picture" loading="lazy"></iframe>
                        </div>
                    )}
                    {showAddToFavs && <Button onClick={addToFavorites} style={{ marginTop: '16px' }} variant="contained" endIcon={<FavoriteIcon />} sx={{
                                        fontFamily: 'Poppins, sans-serif', 
                                        fontWeight: 'bold', 
                                        fontSize: '14px', 
                                        backgroundColor: '#D4E09B', 
                                        color: '#2c320f', 
                                        '&:hover': {
                                            backgroundColor: '#bbce61',
                                          },
                                    }} >
                        Add to favs
                    </Button>} {/* Show the Add to favs button only if the playlist is generated */}
                </div>
            </Grid>
        </Grid>
    );
}

export default RecipePage;
