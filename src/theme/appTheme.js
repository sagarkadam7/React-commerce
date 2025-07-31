import { createTheme } from '@mui/material/styles';

// Define the custom MUI theme for a polished look
const appTheme = createTheme({
  palette: {
    primary: {
      main: '#2196f3', // A vibrant blue
    },
    secondary: {
      main: '#ff4081', // A bright pink for accents
    },
    background: {
      default: '#f8f9fa', // Light grey background for the entire page
      paper: '#ffffff',   // White for cards, modals, and other paper-like surfaces
    },
    text: {
      primary: '#343a40', // Dark grey for main text
      secondary: '#6c757d', // Lighter grey for secondary text
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Standard clean font
    h1: {
      fontSize: '2.8rem',
      fontWeight: 700,
      marginBottom: '1rem',
      color: '#343a40',
    },
    h2: {
      fontSize: '2.2rem',
      fontWeight: 600,
      marginBottom: '0.8rem',
      color: '#343a40',
    },
    h4: {
      fontSize: '1.8rem',
      fontWeight: 600,
      marginBottom: '0.6rem',
      color: '#343a40',
    },
    h6: {
      fontSize: '1.1rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none', // Keep button text as-is, not forced uppercase
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Slightly rounded buttons
          transition: 'transform 0.2s, box-shadow 0.2s', // Smooth hover effect
          '&:hover': {
            transform: 'translateY(-2px)', // Slight lift
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)', // Subtle shadow on hover
          },
        },
        contained: {
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)', // Default shadow for contained buttons
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12, // More rounded cards
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)', // Initial subtle shadow
          transition: 'transform 0.2s, box-shadow 0.2s', // Smooth hover effect
          '&:hover': {
            transform: 'translateY(-5px)', // More pronounced lift
            boxShadow: '0 8px 25px rgba(0,0,0,0.15)', // More prominent shadow on hover
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 12, // Consistent rounded corners for dialogs
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)', // Subtle shadow for the app bar
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)', // Light border at the bottom
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8, // Rounded corners for text fields
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          borderRadius: 8, // Rounded corners for select dropdowns
        },
      },
    },
  },
});

export default appTheme;
