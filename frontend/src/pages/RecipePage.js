import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as api from '../api';
import { Grid, Button, Card, CardContent, CardMedia, Typography, CircularProgress } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const titleStyle = {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 700,
    fontSize: '24px',
    color: '#03071E',
    textTransform: 'uppercase',
};

const keywordStyle = {
    ...titleStyle, 
    fontSize: '16px', 
    textTransform: 'none',
};

const labelStyle = {
    ...titleStyle, 
    textTransform: 'none', 
    fontSize: '16px', 
};  

const regularTextStyle = {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 'normal', 
    fontSize: '14px', 
};  

const instructionsTitleStyle = {
    ...keywordStyle, 
    fontSize: '18px', 
    marginTop: '30px', 
    marginBottom: '20px', 
    fontWeight: 'bold', 
    textTransform: 'uppercase', 
};  

const instructionsStyle = {
    ...keywordStyle, 
    marginBottom: '10px', 
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
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh'
            }}>
                <CircularProgress sx={{ color: '#A44A3F' }} />
            </div>
        );
    }    

    if (!recipe) {
        return <p>Recipe not found</p>;
    }

    return (
        <Grid container spacing={2} sx={{ padding: '0 20px 20px' }}>
            <Grid item xs={12} md={8} >
                <Card style={{ 
                    height: '100%',
                    backgroundColor: 'rgba(246, 244, 210, 0.3)',
                    border: '3px solid #D4E09B', 
                    boxShadow: 'none',
                    margin: '20px 40px',
                }}>
                    <CardContent style={{ 
                        padding: '40px', 
                        paddingBottom: '0', 
                        overflow: 'auto',
                    }}>
                        <Typography gutterBottom variant="h5" component="div" sx={titleStyle}>
                        {recipe.title}
                        </Typography>
                        <CardMedia
                            component="img"
                            style={{
                                height: 'auto',
                                maxWidth: '60%',
                                margin: '0 auto',
                                display: 'block',
                                padding: '20px', 
                                borderRadius: '30px', 
                                boxSizing: 'border-box', 
                                marginBottom: '20px'
                            }}
                            image={recipe.image}
                            alt={recipe.title}
                        />

                        <Typography variant="body2" color="text.secondary" sx={labelStyle}>
                        Servings: {recipe.servings}
                        </Typography>

                        <Typography variant="body2" color="text.secondary" sx={labelStyle}>
                        Ready in Minutes: {recipe.readyInMinutes}
                        </Typography>

                        <Typography variant="body1" sx={instructionsTitleStyle}>
                        <strong>Ingredients</strong>
                        </Typography>

                        {recipe.analyzedInstructions.map((section, index) => (
                            <div key={index}>
                                <Typography variant="body1" gutterBottom><strong>{section.name}</strong></Typography>
                                <ol>
                                    {section.steps.map((step) => (
                                        <li key={step.number} style={instructionsStyle}>{step.step}</li>
                                    ))}
                                </ol>
                            </div>
                        ))}

                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: 'center', paddingRight: '40px' }}>
                <div>
                    {showGeneratePlaylist && (
                        <Button 
                            variant="contained" 
                            sx={{ 
                                fontFamily: 'Poppins, sans-serif', 
                                fontWeight: 'bold', 
                                fontSize: '14px', 
                                backgroundColor: '#A44A3F', 
                                color: '#F6F4D2', 
                                m: 2, 
                                '&:hover': {
                                    backgroundColor: '#823C32',
                                },
                            }} 
                            onClick={handleGeneratePlaylist}
                        >
                            Playlist Generator
                        </Button>                                       
                    )}
                    
                    {playlist && (
                        <div style={{ marginTop: '20px' }}> 
                            <iframe style={{ borderRadius: '12px' }} src={`https://open.spotify.com/embed/playlist/${playlist.id}?utm_source=generator`} 
                            width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; 
                            picture-in-picture" loading="lazy"></iframe>
                        </div>
                    )}
                    {showAddToFavs && <Button 
                        onClick={addToFavorites} 
                        style={{ marginTop: '16px' }} 
                        variant="contained" 
                        startIcon={<FavoriteIcon />} 
                        sx={{
                            fontFamily: 'Poppins, sans-serif', 
                            fontWeight: 'bold', 
                            fontSize: '14px', 
                            backgroundColor: '#E5EAB7', 
                            color: '#606C38', 
                            '&:hover': {
                                backgroundColor: '#D4E09B',
                            },
                        }} 
                    >
                        Add to Favorites
                    </Button>} {/* Show the Add to Favorites button only if the playlist is generated */}
                </div>
            </Grid>
        </Grid>
    );
}

export default RecipePage;
