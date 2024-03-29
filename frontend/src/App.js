import React from 'react';
import ReactDOM from 'react-dom';
import "./App.css";
import { useState } from 'react';
import * as api from './api'


// our app
function App() {
    const [ingredients, setIngredients] = useState("");
    const[recipes, setRecipes] = useState([]);

    const handleSubmit = async () =>{
        try { 
            const recipes = await api.searchByIngredients(ingredients);
            setRecipes(recipes);
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) =>{
        setIngredients(e.target.value);
    }

    return (
      <div>
        <input type='text' onChange={handleChange}></input>
       
        <button onClick={handleSubmit}>Submit</button>
        
        
        {recipes.map((recipe)=> (
            <div>
                <img src={recipe.image}></img>
                {/* recipe image location: {recipe.image} */}
                recipe title: {recipe.title}
            </div>
        ))}
        
      </div>
    );
  }
  
  export default App;
