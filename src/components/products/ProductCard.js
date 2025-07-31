import React, { useState } from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, Button, Box } from '@mui/material';
import BrokenImageIcon from '@mui/icons-material/BrokenImage'; // Import for image fallback

import { useCart } from '../../context/CartContext';
import ProductDetailModal from './ProductDetailModal';
import { SnackbarProvider } from '../common/NotificationSnackbar';

function ProductCard({ product }) {
  const { addItem } = useCart();
  const snackbarRef = React.useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageError, setImageError] = useState(false); // State to handle image loading errors

  const handleAddToCart = () => {
    addItem(product);
    if (snackbarRef.current) {
      snackbarRef.current.show(`${product.title} added to cart!`, 'success');
    }
  };

  return (
    <>
      <Card sx={{
        height: '100%', // Ensures card takes full height of its grid item
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', // Pushes CardActions to the bottom
      }}>
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
          {/* Conditional rendering for image or fallback icon */}
          {imageError ? (
            <Box sx={{ height: 180, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0', borderRadius: 2, mb: 2 }}>
              <BrokenImageIcon sx={{ fontSize: 60, color: '#ccc' }} />
            </Box>
          ) : (
            <CardMedia
              component="img"
              sx={{
                height: 180,
                width: 'auto',
                maxWidth: '100%',
                objectFit: 'contain',
                mb: 2,
              }}
              image={product.image}
              alt={product.title}
              onError={() => setImageError(true)} // Set imageError state if image fails to load
            />
          )}
          <CardContent sx={{
            flexGrow: 1,
            width: '100%',
            p: 0,
            minHeight: { xs: '80px', sm: '90px', md: '100px' }, // Ensure consistent height for content area
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start', // Align content to the top within this space
          }}>
            <Typography gutterBottom variant="h6" component="div"
              sx={{
                fontSize: '1.1rem',
                lineHeight: 1.3,
                height: '2.6em', // Fixed height for 2 lines of text (1.3 * 2)
                overflow: 'hidden', // Hide overflow if text is too long
                textOverflow: 'ellipsis', // Add ellipsis for overflowed text
                display: '-webkit-box',
                WebkitLineClamp: 2, // Limit to 2 lines for consistency
                WebkitBoxOrient: 'vertical',
              }}
            >
              {product.title}
            </Typography>
            <Typography variant="body1" color="text.primary" sx={{ fontWeight: 'bold', mt: 'auto' }}>
              ${product.price.toFixed(2)}
            </Typography>
          </CardContent>
        </Box>
        <CardActions sx={{ justifyContent: 'space-between', p: 2, pt: 0 }}>
          <Button size="small" onClick={() => setIsModalOpen(true)}>
            View Details
          </Button>
          <Button size="small" variant="contained" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </CardActions>
      </Card>

      <ProductDetailModal
        productId={product.id}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <SnackbarProvider ref={snackbarRef} />
    </>
  );
}

export default ProductCard;
