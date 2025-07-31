import React, { useState, createContext, useContext, forwardRef, useImperativeHandle } from 'react';
import { Snackbar, Alert, Slide } from '@mui/material';

// Create a Context for the Snackbar to make it globally accessible
const SnackbarContext = createContext();

// SnackbarProvider component that will render the Snackbar
// We use forwardRef and useImperativeHandle to expose a 'show' method
// so other components can trigger the snackbar programmatically.
export const SnackbarProvider = forwardRef(({ children }, ref) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info'); // Can be 'success', 'error', 'warning', 'info'

  // Expose a 'show' method via ref
  useImperativeHandle(ref, () => ({
    show: (message, severity = 'info') => {
      setSnackbarMessage(message);
      setSnackbarSeverity(severity);
      setSnackbarOpen(true);
    },
  }));

  // Handle closing the Snackbar
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') { // Prevent closing on click outside if desired
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    // Provide the snackbar functionality to children (not used directly, but good pattern)
    <SnackbarContext.Provider value={{ showSnackbar: (message, severity) => setSnackbarOpen(true) }}>
      {children}
      <Snackbar
        open={snackbarOpen} // Controls visibility
        autoHideDuration={3000} // Automatically hides after 3 seconds
        onClose={handleClose} // Callback when Snackbar requests to be closed
        TransitionComponent={Slide} // Smooth slide transition
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} // Position on screen
      >
        <Alert
          onClose={handleClose} // Close button on the Alert itself
          severity={snackbarSeverity} // Color/icon based on severity
          sx={{ width: '100%' }} // Full width within the Snackbar
          variant="filled" // Filled style for better visibility
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
});

// Custom hook to consume the SnackbarContext (not directly used in this app's current setup, but a standard pattern)
export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};
