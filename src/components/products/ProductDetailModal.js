import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, CircularProgress, Box, Rating, Alert, Grid
} from '@mui/material';
import { getProductById } from '../../api/fakeStoreApi'; // Import the API function for single product
import { useCart } from '../../context/CartContext'; // Import useCart hook to add to cart from modal
import { SnackbarProvider } from '../common/NotificationSnackbar'; // Import SnackbarProvider

function ProductDetailModal({ productId, open, onClose }) {
  const { addItem } = useCart(); // Get the addItem function from cart context
  const snackbarRef = React.useRef(); // Create a ref to access SnackbarProvider's methods
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch if the modal is open and a productId is provided
    if (!open || !productId) {
      // Reset state when modal closes or productId is missing
      setProduct(null);
      setLoading(true);
      setError(null);
      return;
    }

    const fetchProductDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getProductById(productId); // Fetch details for the specific product ID
        setProduct(response.data);
      } catch (err) {
        console.error('Failed to fetch product details:', err);
        setError('Failed to load product details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId, open]); // Effect runs when productId or 'open' state changes

  const handleAddToCart = () => {
    if (product) { // Ensure product data is loaded before adding to cart
      addItem(product);
      if (snackbarRef.current) {
        snackbarRef.current.show(`${product.title} added to cart!`, 'success'); // Show success notification
      }
      onClose(); // Close the modal after adding the item to cart
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        {/* Dialog Title */}
        <DialogTitle>
          {loading ? 'Loading...' : error ? 'Error' : product ? product.title : 'Product Details'}
        </DialogTitle>
        <DialogContent dividers> {/* `dividers` adds a line */}
          {loading ? (
            // Loading state for modal content
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="200px">
              <CircularProgress />
              <Typography variant="body1" sx={{ ml: 2, mt: 2 }}>Loading details...</Typography>
            </Box>
          ) : error ? (
            // Error state for modal content
            <Alert severity="error">{error}</Alert>
          ) : product ? (
            // Display product details once loaded
            <Grid container spacing={4}> {/* Use Grid for responsive layout within modal */}
              <Grid item xs={12} md={5}>
                <Box
                  component="img"
                  src={product.image}
                  alt={product.title}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '400px', // Limit image height in modal
                    objectFit: 'contain',
                    border: '1px solid #eee', // Subtle border
                    borderRadius: 8, // Rounded corners
                    p: 1, // Padding inside the box
                  }}
                />
              </Grid>
              <Grid item xs={12} md={7}>
                <Typography variant="h5" gutterBottom component="h2" color="primary.main">
                  ${product.price.toFixed(2)}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
                  Category: {product.category.charAt(0).toUpperCase() + product.category.slice(1)} {/* Capitalize category */}
                </Typography>
                <Typography variant="body1" paragraph sx={{ color: 'text.primary' }}>
                  {product.description}
                </Typography>
                <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
                  {/* Rating component for star display */}
                  <Rating value={product.rating.rate || 0} readOnly precision={0.1} />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    ({product.rating.count} reviews)
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          ) : (
            // Fallback if no product data but no specific error
            <Typography>No product data available.</Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}> {/* Padding for actions */}
          <Button onClick={onClose} variant="outlined">Close</Button>
          {product && ( // Only show "Add to Cart" if product data is available
            <Button variant="contained" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          )}
        </DialogActions>
      </Dialog>
      {/* SnackbarProvider is placed here to be accessible within the ProductDetailModal's scope */}
      <SnackbarProvider ref={snackbarRef} />
    </>
  );
}

export default ProductDetailModal;
