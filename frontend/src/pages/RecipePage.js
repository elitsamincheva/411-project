import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as api from '../api';
import { Grid, Button } from '@mui/material';

function RecipePage() {
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const { recipeId } = useParams(); // Ensure that recipeId is extracted from the URL

    console.log("recipe id:", recipeId);
    
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

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!recipe) {
        return <p>Recipe not found</p>;
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={8}> {/* Left column takes full width on small screens and 8 columns on medium screens */}
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
            <Grid item xs={12} md={4}> {/* Right column takes full width on small screens and 4 columns on medium screens */}
                <div style={{ textAlign: 'right' }}>
                    <Button variant="contained" >
                        Generate Playlist
                    </Button>
                </div>
            </Grid>
        </Grid>
    );
}

export default RecipePage;
