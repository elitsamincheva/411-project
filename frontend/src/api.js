export const searchByIngredients = async (ingredients) => {
    const baseUrl = new URL("http://localhost:3000/api/recipes/search");
    baseUrl.searchParams.append("ingredients", ingredients);

    const response = await fetch(baseUrl);
    if(!response.ok){
        throw new Error(`HTTP error. Status: ${response.status}`);
    }

    return response.json();
};

