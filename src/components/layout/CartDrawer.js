import React from 'react';
import {
  Drawer, Box, Typography, List, ListItem, ListItemText,
  IconButton, Divider, Button, Avatar, Grid
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // Re-import ShoppingCartIcon for empty state
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { useCart } from '../../context/CartContext'; // Import your custom useCart hook
import { SnackbarProvider } from '../common/NotificationSnackbar'; // Import SnackbarProvider

function CartDrawer({ open, onClose }) {
  // Destructure cart state and actions from your cart context
  const { cartItems, totalQuantity, totalPrice, removeItem, updateQuantity, clearCart } = useCart();
  const snackbarRef = React.useRef(); // Create a ref to access SnackbarProvider's methods

  // Handler for updating item quantity
  const handleUpdateQuantity = (id, quantity) => {
    updateQuantity(id, quantity);
    if (snackbarRef.current) {
      snackbarRef.current.show(`Quantity updated for item.`, 'info');
    }
  };

  // Handler for removing an item
  const handleRemoveItem = (id) => {
    removeItem(id);
    if (snackbarRef.current) {
      snackbarRef.current.show(`Item removed from cart.`, 'warning');
    }
  };

  // Handler for clearing the entire cart
  const handleClearCart = () => {
    clearCart();
    if (snackbarRef.current) {
      snackbarRef.current.show(`Cart cleared!`, 'warning');
    }
  };

  return (
    <>
      <Drawer
        anchor="right" // The drawer will slide in from the right
        open={open}    // Controlled by the `isCartDrawerOpen` state in ProductListingPage
        onClose={onClose} // Function to close the drawer (passed from ProductListingPage)
        PaperProps={{
          // Responsive width for the drawer: 90% on extra-small screens, 450px on small+ screens
          sx: { width: { xs: '90%', sm: '450px' }, borderRadius: '12px 0 0 12px' }, // Rounded top-right corner
        }}
      >
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'primary.main', color: 'white', borderRadius: '12px 0 0 0' }}>
          {/* Cart Title and Item Count */}
          <Typography variant="h5" component="div">
            Your Shopping Cart ({totalQuantity})
          </Typography>
          {/* You can add a close icon here if desired, e.g., <CloseIcon /> */}
          <IconButton onClick={onClose} color="inherit" aria-label="close cart">
            {/* No explicit close icon needed as clicking outside closes */}
          </IconButton>
        </Box>
        <Divider /> {/* Separator line */}

        {/* List of Cart Items */}
        <List sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
          {cartItems.length === 0 ? (
            // Message and icon when cart is empty
            <Box sx={{ textAlign: 'center', mt: 4, color: 'text.secondary' }}>
              <ShoppingCartIcon sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h6">Your cart is empty.</Typography>
              <Typography variant="body2">Add some amazing products!</Typography>
            </Box>
          ) : (
            // Map through each item in the cart
            cartItems.map((item) => (
              <ListItem
                key={item.id} // Important for React list rendering
                secondaryAction={
                  // Delete button for each item
                  <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveItem(item.id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                }
                sx={{ py: 1.5, mb: 1, borderBottom: '1px solid #eee' }} // Vertical padding and bottom border
              >
                {/* Product Image */}
                <Avatar src={item.image} variant="rounded" sx={{ mr: 2, width: 70, height: 70, objectFit: 'contain', border: '1px solid #ddd' }} />

                {/* Product Name and Price x Quantity */}
                <ListItemText
                  primary={<Typography variant="subtitle1" noWrap>{item.title}</Typography>}
                  secondary={
                    <Typography variant="body2" color="text.secondary">
                      ${item.price.toFixed(2)}
                    </Typography>
                  }
                />

                {/* Quantity Controls */}
                <Box display="flex" alignItems="center" sx={{ ml: 2 }}>
                  <IconButton size="small" onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <Typography variant="body1" sx={{ mx: 0.5, minWidth: '20px', textAlign: 'center' }}>{item.quantity}</Typography>
                  <IconButton size="small" onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>
              </ListItem>
            ))
          )}
        </List>

        <Divider /> {/* Separator before totals and actions */}

        {/* Cart Summary and Actions */}
        <Box sx={{ p: 3, backgroundColor: 'background.paper', borderRadius: '0 0 0 12px' }}>
          <Typography variant="h6" gutterBottom align="right">
            Total: <Box component="span" sx={{ color: 'primary.main', fontWeight: 'bold' }}>${totalPrice.toFixed(2)}</Box> {/* Display calculated total price */}
          </Typography>
          <Button variant="contained" fullWidth sx={{ mt: 2 }} disabled={cartItems.length === 0}>
            Proceed to Checkout
          </Button>
          {cartItems.length > 0 && (
            // Clear cart button, visible only if cart has items
            <Button variant="outlined" color="secondary" fullWidth sx={{ mt: 1 }} onClick={handleClearCart}>
              Clear Cart
            </Button>
          )}
        </Box>
      </Drawer>
      {/* SnackbarProvider is placed here to be accessible within the CartDrawer's scope */}
      <SnackbarProvider ref={snackbarRef} />
    </>
  );
}

export default CartDrawer;
