import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as api from '../api';
import { Grid, Button } from '@mui/material';

function RecipePage() {
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [playlist, setPlaylist] = useState(null);
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
        } catch (error) {
            console.error('Error generating playlist:', error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!recipe) {
        return <p>Recipe not found</p>;
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
                <div>
                    <h2>{recipe.title}</h2>
                    <img src={recipe.image} alt={recipe.title} />
                    <p>Servings: {recipe.servings}</p>
                    <p>Ready in minutes: {recipe.readyInMinutes}</p>
            
                    <h3>Instructions:</h3>
                    {recipe.analyzedInstructions.map((section, index) => (
                        <div key={index}>
                            <h4>{section.name}</h4>
                            <ol>
                                {section.steps.map((step) => (
                                    <li key={step.number}>{step.step}</li>
                                ))}
                            </ol>
                        </div>
                    ))}
                </div>
            </Grid>
            <Grid item xs={12} md={4}>
                <div style={{ textAlign: 'right' }}>
                    <Button variant="contained" onClick={handleGeneratePlaylist}>
                        Generate Playlist
                    </Button>
                    {playlist && (
                        <div>
                            <h3>Generated Playlist:</h3>
                            <iframe style={{'border-radius':'12px'}} src={`https://open.spotify.com/embed/playlist/${playlist.id}?utm_source=generator`} 
                            width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; 
                            picture-in-picture" loading="lazy"></iframe>
                        </div>
                    )}
                </div>
            </Grid>
        </Grid>
    );
}

export default RecipePage;
