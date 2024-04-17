import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RecipeSearchPage from './pages/RecipeSearchPage';
import LoginPage from './pages/LoginPage';
import Layout from './pages/Layout';

function App() {
  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<Layout />}>
        <Route path="/recipe-search" element={<RecipeSearchPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
