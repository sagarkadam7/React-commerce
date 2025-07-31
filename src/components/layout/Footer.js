import React from 'react';
import { Box, Typography, Container } from '@mui/material';

// Simple footer component for the application
const Footer = () => {
  return (
    <Box component="footer" sx={{
      py: 3, // Vertical padding
      px: 2, // Horizontal padding
      mt: 'auto', // Pushes the footer to the bottom of the page
      backgroundColor: 'primary.main', // Use primary theme color for background
      color: 'white', // White text for contrast
      textAlign: 'center', // Center align text
      borderRadius: '12px 12px 0 0', // Rounded top corners
      boxShadow: '0 -2px 10px rgba(0,0,0,0.05)', // Subtle shadow above the footer
    }}>
      <Container maxWidth="lg">
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} Mini E-Commerce Website. All rights reserved.
        </Typography>
        <Typography variant="body2" sx={{ mt: 0.5 }}>
          Built with React & Material UI for Solytics Partners Internship.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
