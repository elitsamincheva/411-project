import React from 'react';
import { Grid, TextField, Button, ThemeProvider, createTheme } from '@mui/material';
import * as api from '../api';
import RecipeCard from '../components/RecipeCard';

// Create a theme for consistent application styling
const theme = createTheme({
  typography: {
    fontFamily: '"Roboto Mono", monospace',
  },
  palette: {
    primary: {
      main: '#A44A3F', 
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#A44A3F', 
          }
        }
      }
    }
  }
});

function RecipeSearchPage() {
    const [ingredients, setIngredients] = React.useState({
        ingredient1: "",
        ingredient2: "",
        ingredient3: ""
    });
    const [recipes, setRecipes] = React.useState([]);

    const handleSubmit = async () => {
        try {
            const ingredientsList = Object.values(ingredients).filter(ingredient => ingredient.trim() !== "").join(", ");
            const fetchedRecipes = await api.searchByIngredients(ingredientsList);
            setRecipes(fetchedRecipes);
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
        <ThemeProvider theme={theme}>
            <Grid container style={{ maxWidth: '100vw', margin: '0', padding: '40px 20px 20px' }}>
                <Grid item xs={4}>
                    <Grid container direction="column" spacing={2} alignItems="center" sx={{ paddingTop: '20px', paddingLeft: '20px' }}> 
                        <Grid item>
                            <TextField 
                                name="ingredient1" 
                                label="Ingredient 1" 
                                variant="outlined" 
                                onChange={handleChange}
                                sx={{
                                    width: '100%',
                                    '& .MuiInputBase-input': {
                                        fontWeight: 'bold' 
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                name="ingredient2" 
                                label="Ingredient 2" 
                                variant="outlined" 
                                onChange={handleChange}
                                sx={{
                                    width: '100%',
                                    '& .MuiInputBase-input': {
                                        fontWeight: 'bold' 
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                name="ingredient3" 
                                label="Ingredient 3" 
                                variant="outlined" 
                                onChange={handleChange}
                                sx={{
                                    width: '100%',
                                    '& .MuiInputBase-input': {
                                        fontWeight: 'bold' 
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                onClick={handleSubmit}
                                sx={{
                                    fontFamily: 'Poppins, sans-serif', 
                                    fontWeight: 'bold', 
                                    fontSize: '14px', 
                                    backgroundColor: '#A44A3F', 
                                    color: '#F6F4D2', 
                                }}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={8}>
                    <Grid container spacing={3} justifyContent="center">
                        {recipes.map((recipe, index) => (
                            <Grid item xs={4} key={index}>
                                <RecipeCard title={recipe.title} image={recipe.image} recipeId={recipe.id}/>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default RecipeSearchPage;
