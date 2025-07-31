import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import appTheme from './theme/appTheme'; // Import your custom MUI theme
import { CartProvider } from './context/CartContext'; // Import your CartProvider

import ProductListingPage from './pages/ProductListingPage'; // Import your Product Listing Page

function App() {
  return (
    // 1. ThemeProvider: Applies your custom Material UI theme across the entire app.
    <ThemeProvider theme={appTheme}>
      {/* 2. CssBaseline: A CSS reset for Material UI to ensure consistent styling. */}
      <CssBaseline />
      {/* 3. CartProvider: Makes the cart state and actions available to all components within it. */}
      <CartProvider>
        {/* 4. Router: Enables navigation between different pages in your app. */}
        <Router>
          <Routes>
            {/* Define your main route for the product listing page */}
            <Route path="/" element={<ProductListingPage />} />
            {/* Future routes for product details, cart page etc. will go here */}
          </Routes>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
