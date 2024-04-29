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

export const getRecipeDetails = async (recipeId) => {
    // Construct base URL for the API endpoint
    const baseUrl = new URL(`http://localhost:3000/api/recipes/${recipeId}/information`);
    
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

// Function for generating a playlist based on user preferences
export const generatePlaylist = async (minutes, recipeName) => {
    // Fetch data from the backend API
    const response = await fetch('http://localhost:3000/api/generate-playlist', {   // sends a POST request to the backend API endpoint
        method: 'POST', // request method is POST, indicating that data will be sent to the server
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ minutes, recipeName }),
        credentials: 'include' 
    });

    // Check if the response is successful
    if (!response.ok) {
        // Throw an error if response is not ok
        throw new Error(`HTTP error. Status: ${response.status}`);
    }

    // Parse the response as JSON and return it
    return response.json();
};

export const addUserFavorite = async(recipe, playlist_id) => {
    const response = await fetch('http://localhost:3000/api/favorites', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ recipe, playlist_id }),
        credentials: 'include'
    });

    if(!response.ok) {
        throw new Error(`Status: ${response.status}`);
    }

    return response.json();
};

export const getUserFavorites = async() => {
    const response = await fetch('http://localhost:3000/api/favorites', {
        credentials: 'include'
    });

    if(!response.ok) {
        throw new Error(`Status: ${response.status}`);
    }

    return response.json();
};

export const deleteUserFavorite = async (favoriteId) => {
    // Construct the URL for the DELETE request
    const url = `http://localhost:3000/api/favorites/${favoriteId}`;

    // Send a DELETE request to the backend API
    const response = await fetch(url, {
        method: 'DELETE',
        credentials: 'include'
    });

    // Check if the response is successful
    if (!response.ok) {
        // Throw an error if response is not ok
        throw new Error(`HTTP error. Status: ${response.status}`);
    }
};


