import express from 'express'; // Import Express framework
import cors from 'cors'; // Import CORS middleware
import 'dotenv/config.js'; // Import dotenv for environment variables
import * as RecipeAPI from './recipe-api.js'; // Import RecipeAPI module

const app = express(); // Create an instance of Express to create the web server

// Middleware setup
app.use(express.json()); // Parse incoming requests with JSON payloads
app.use(cors()); // Enable CORS for all routes

// Route for searching recipes by ingredients
app.get("/api/recipes/search", async (req, res) => {
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

// Start the web server on port 3000
app.listen(3000, () => {
    console.log("heyyyyy ;)"); // Log a message when the server starts successfully
});
