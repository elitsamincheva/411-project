// Function for searching recipes by ingredients
export const searchByIngredients = async (ingredients) => {
    // Construct base URL for the API endpoint
    const baseUrl = new URL("http://localhost:3000/api/recipes/search");
    // Append ingredients to the search parameters
    baseUrl.searchParams.append("ingredients", ingredients);

    // Fetch data from the API
    const response = await fetch(baseUrl);
    // Check if the response is successful
    if (!response.ok) {
        // Throw an error if response is not ok
        throw new Error(`HTTP error. Status: ${response.status}`);
    }

    // Parse the response as JSON and return it
    return response.json();
};
