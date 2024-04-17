import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RecipeSearchPage from './pages/RecipeSearchPage';

import Layout from './pages/Layout';

function App() {
  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<RecipeSearchPage />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
