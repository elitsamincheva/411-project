import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RecipeSearchPage from './pages/RecipeSearchPage';
import UserFavoritesPage from './pages/UserFavoritesPage';
import LoginPage from './pages/LoginPage';
import Layout from './pages/Layout';
import RecipePage from './pages/RecipePage';

function App() {
  return (
    <BrowserRouter basename='/'>
      <Routes>
        { /* Set the login page as the root route */ }
        <Route element={<Layout />}>
          <Route path="/" element={<RecipeSearchPage />} />
          <Route path="/recipe/:recipeId/information" element={<RecipePage />} />
          <Route path="/favorites" element={<UserFavoritesPage />} />
        </Route>
        <Route index path='/login' element={<LoginPage />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
