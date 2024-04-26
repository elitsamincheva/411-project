
import { Grid } from '@mui/material';
import * as api from '../api';
import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';

function UserFavoritesPage() {
    const [favorites, setFavorites] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const result = await api.getUserFavorites();
                setFavorites(result);
            } catch (error) {
                console.error('Error fetching favorites :', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }
    
    return (

        <>
        <h1>Your Favorites</h1>
        <Grid container style={{ maxWidth: '100vw', margin: '0', padding: '40px 20px 20px' }}>
            <Grid item xs={12}>
                <Grid container spacing={3} justifyContent="center">
                    {favorites.map((favorite, index) => (
                        <Grid item xs={3} key={index}>
                            <RecipeCard title={favorite.recipe.title} image={favorite.recipe.image} linkTo={`/recipe/${favorite.recipe.id}/information`}/>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
        </>
        
    );

}
export default UserFavoritesPage;