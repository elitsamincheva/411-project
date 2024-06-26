import React from 'react';
import { Grid, TextField, Button, ThemeProvider, createTheme, Typography } from '@mui/material';
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
            <Grid container style={{ maxWidth: '100vw', margin: '0', padding: '20px 20px 20px 0' }}>
                <Grid item xs={3}>
                    <Grid container direction="column" spacing={2} alignItems="center" sx={{ padding: '20px' }}> 
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
                                    '&:hover': {
                                        backgroundColor: '#823C32',
                                    },
                                }}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={9}>
                {recipes.length > 0 ? (
                    <Grid container spacing={3} justifyContent="flex-start" sx={{ paddingRight: '40px' }}>
                    {recipes.map((recipe, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                        <RecipeCard title={recipe.title} image={recipe.image} linkTo={`/recipe/${recipe.id}/information`} />
                        </Grid>
                    ))}
                    </Grid>
                ) : (
                    <Typography
                    variant="h4"
                    component="h2"
                    sx={{
                        textAlign: 'center',
                        fontFamily: '"Roboto Mono", monospace', 
                        color: '#A44A3F', 
                        marginTop: '20px', 
                        marginBottom: '20px', 
                        fontSize: '18px',
                    }}
                    >
                    Find recipes by ingredients that you have on hand.
                    </Typography>
                )}
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default RecipeSearchPage;
