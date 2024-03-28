const apiKey = process.env.API_KEY;

export const searchByIngredients = async (ingredients)=>{
    if(!apiKey){
        throw new Error("API key not found")
    }

    const url = new URL("https://api.spoonacular.com/recipes/findByIngredients");
    const queryParams = {
        apiKey,
        ingredients,
        number: 9,
        ranking: 1
    }
    url.search = new URLSearchParams(queryParams).toString();

    try {
        const searchResponse = await fetch(url);
        const resultsJson = await searchResponse.json();
        return resultsJson;
    } catch (error) {
        console.log(error);
    }
}