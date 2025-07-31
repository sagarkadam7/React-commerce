import React from 'react';
import { Grid, Card, CardContent, CardActions, Skeleton, Box } from '@mui/material';

// This component displays a grid of skeleton loaders
// It mimics the structure of a ProductCard to provide a smooth transition
const LoadingSkeleton = () => {
  return (
    <Grid container spacing={4}>
      {/* Generate 8 skeleton cards to fill the initial view */}
      {Array.from(new Array(8)).map((_, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
          <Card sx={{
            height: '100%', // Match ProductCard height
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRadius: 12, // Match ProductCard border radius
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)', // Match ProductCard shadow
          }}>
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
              {/* Skeleton for the image */}
              <Skeleton variant="rectangular" width="100%" height={180} sx={{ borderRadius: 8, mb: 2 }} />
              <CardContent sx={{ flexGrow: 1, width: '100%', p: 0 }}>
                {/* Skeletons for title and price */}
                <Skeleton variant="text" width="80%" height={30} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="40%" height={20} />
              </CardContent>
            </Box>
            <CardActions sx={{ justifyContent: 'space-between', p: 2, pt: 0 }}>
              {/* Skeletons for buttons */}
              <Skeleton variant="rectangular" width={80} height={36} sx={{ borderRadius: 8 }} />
              <Skeleton variant="rectangular" width={100} height={36} sx={{ borderRadius: 8 }} />
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default LoadingSkeleton;
