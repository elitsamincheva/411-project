import React from 'react';
import { Grid, TextField, Button } from '@mui/material';
import * as api from '../api';
import RecipeCard from '../components/RecipeCard';



function RecipeSearchPage(){
    // State variables to manage ingredients and recipes
    const [ingredients, setIngredients] = React.useState({
        ingredient1: "",
        ingredient2: "",
        ingredient3: ""
    });
    const [recipes, setRecipes] = React.useState([]);

    // Function to handle form submission when press button
    const handleSubmit = async () => {
        try { 
            // Create a comma-separated list of ingredients
            const ingredientsList = Object.values(ingredients).filter(ingredient => ingredient.trim() !== "").join(", ");
            // Fetch recipes based on the entered ingredients
            const recipes = await api.searchByIngredients(ingredientsList);
            // Update state with fetched recipes
            setRecipes(recipes);
        } catch (error) {
            console.log(error);
        }
    }

    // Function to handle input changes
    const handleChange = (e) => {
        // Update the corresponding ingredient in state
        setIngredients({
            ...ingredients,
            [e.target.name]: e.target.value
        });
    }
    return (
        <Grid container spacing={2}>
           
            {/* Left column for text fields and submit button */}
            <Grid item xs={4}>
                {/* Nested grid container with direction set to column and alignItems set to center */}
                <Grid container direction="column" spacing={2} alignItems="center">
                    {/* Text field for Ingredient 1 */}
                    <Grid item>
                        <TextField name="ingredient1" id="outlined-basic" label="Ingredient 1" variant="outlined" onChange={handleChange}/>
                    </Grid>
                    {/* Text field for Ingredient 2 */}
                    <Grid item>
                        <TextField name="ingredient2" id="outlined-basic" label="Ingredient 2" variant="outlined" onChange={handleChange}/>
                    </Grid>
                    {/* Text field for Ingredient 3 */}
                    <Grid item>
                        <TextField name="ingredient3" id="outlined-basic" label="Ingredient 3" variant="outlined" onChange={handleChange}/>
                    </Grid>
                    {/* Submit button */}
                    <Grid item>
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            sx={{
                                backgroundColor: '#A44A3F', // Set background color
                                color: '#FFC7C0', // Set text color
                                '&:hover': {
                                    backgroundColor: '#6d312a', // Set background color on hover
                                    color: '#F8B0A8', // Set text color on hover
                                },
                                
                            }}
                        >
                            Submit
                        </Button>
                    </Grid>

                </Grid>
            </Grid>

            {/* Right column for displaying recipes */}
            <Grid item xs={8}>
                <Grid container spacing={2}>
                    {/* Map over fetched recipes and render RecipeCard components */}
                    {recipes.map((recipe, index) => (
                        <Grid item xs={4} key={index}> 
                            <RecipeCard
                                title={recipe.title}
                                image={recipe.image}
                                recipeId={recipe.id} 
                            />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );

}
export default RecipeSearchPage;