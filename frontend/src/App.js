import React from 'react';
import { Grid, TextField, Button } from '@mui/material';
import * as api from './api';
import RecipeCard from './components/RecipeCard';
import TopMenuBar from './components/TopMenuBar';

function App() {
    const [ingredients, setIngredients] = React.useState({
        ingredient1: "",
        ingredient2: "",
        ingredient3: ""
    });
    const [recipes, setRecipes] = React.useState([]);

    const handleSubmit = async () => {
        try { 
            const ingredientsList = Object.values(ingredients).filter(ingredient => ingredient.trim() !== "").join(", ");
            const recipes = await api.searchByIngredients(ingredientsList);
            setRecipes(recipes);
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => {
        setIngredients({
            ...ingredients,
            [e.target.name]: e.target.value
        });
    }

    return (
        <Grid container spacing={2}>
            <TopMenuBar/>
            {/* Left column for text fields and submit button */}
            <Grid item xs={4}>
                {/* Nested grid container with direction set to column */}
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <TextField name="ingredient1" id="outlined-basic" label="Ingredient 1" variant="outlined" onChange={handleChange}/>
                    </Grid>
                    <Grid item>
                        <TextField name="ingredient2" id="outlined-basic" label="Ingredient 2" variant="outlined" onChange={handleChange}/>
                    </Grid>
                    <Grid item>
                        <TextField name="ingredient3" id="outlined-basic" label="Ingredient 3" variant="outlined" onChange={handleChange}/>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                    </Grid>
                </Grid>
            </Grid>

            {/* Right column for displaying recipes */}
            <Grid item xs={8}>
                <Grid container spacing={2}>
                    {recipes.map((recipe, index) => (
                        <Grid item xs={4} key={index}> 
                            <RecipeCard
                                title={recipe.title}
                                image={recipe.image}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
}

export default App;
