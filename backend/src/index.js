import express from 'express'
import cors from 'cors'
import 'dotenv/config.js'
import * as RecipeAPI from './recipe-api.js'


const app = express();   // create web server

// middlewares
app.use(express.json());     // repsonse serialized as json
// let corsoptions = {origin: ['http://localhost:3001']};
app.use(cors());             

app.get("/api/recipes/search", async (req, res)=>{
    const recipes = await RecipeAPI.searchByIngredients(req.query.ingredients);
    return res.json(recipes);
})

// run web server
app.listen(3000, ()=>{
    console.log("heyyyyy ;)");
});
