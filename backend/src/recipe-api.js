// Retrieve API key from environment variables
const apiKey = process.env.API_KEY;

// Function for searching recipes by ingredients
export const searchByIngredients = async (ingredients) => {
    // Check if API key is available
    if (!apiKey) {
        // Throw an error if API key is not found
        throw new Error("API key not found");
    }

    // Construct URL for the Spoonacular API endpoint
    const url = new URL("https://api.spoonacular.com/recipes/findByIngredients");
    
    // Define query parameters
    const queryParams = {
        apiKey, // API key
        ingredients, // Ingredients for search
        number: 9, // Number of results to return
        ranking: 1 // Ranking option
    };

    // Append query parameters to the URL
    url.search = new URLSearchParams(queryParams).toString();

    try {
        // Fetch data from the Spoonacular API
        const searchResponse = await fetch(url);
        // Parse the response as JSON
        const resultsJson = await searchResponse.json();
        // Return the JSON results
        return resultsJson;
    } catch (error) {
        // Log any errors that occur during the fetch request
        console.log(error);
    }
};
