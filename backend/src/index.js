import express from 'express'; // Import Express framework
import cors from 'cors'; // Import CORS middleware
import 'dotenv/config.js'; // Import dotenv for environment variables
import * as RecipeAPI from './recipe-api.js'; // Import RecipeAPI module
import cookieParser from 'cookie-parser';
import { login, authCallback, getUserInfo } from './spotify-auth.js';
import session from 'express-session';
import { getRecommendations } from './generate-playlist.js';
const app = express(); // Create an instance of Express to create the web server
const port = 3000;
// Middleware setup
app.use(express.json()); // Parse incoming requests with JSON payloads
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
})); // Enable CORS for all routes
app.use(cookieParser());
app.use(session({
    proxy: process.env.ENV === 'production',
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {},
    store: new session.MemoryStore()
}));


app.get('/login', login);
app.get('/auth/callback', authCallback);
// app.get('/refresh_token', refreshToken);
app.get('/user', getUserInfo);


// Route for searching recipes by ingredients
app.get("/api/recipes/search", async (req, res) => {
    console.log("made it to index.js")
    try {
        // Call the searchByIngredients function from RecipeAPI module
        const recipes = await RecipeAPI.searchByIngredients(req.query.ingredients);
        // Send the retrieved recipes as a JSON response
        return res.json(recipes);
    } catch (error) {
        // If an error occurs, send a 500 status code along with the error message
        return res.status(500).json({ error: error.message });
    }
});

// Route for getting detailed information about a specific recipe
app.get("/api/recipes/:id/information", async (req, res) => {
    const recipeId = req.params.id;
    try {
        const recipeDetails = await RecipeAPI.getRecipeDetails(recipeId);
        return res.json(recipeDetails);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

app.post("/api/generate-playlist", async (req, res) => {
    const body = req.body;
    const recommendations = await getRecommendations(body.minutes, body.recipeName, req);
    return res.json(recommendations);
});

// Start the web server on port 3000
app.listen(port, () => {
    console.log(`heyyyyy ;), listening on port ${port}`); // Log a message when the server starts successfully
});
