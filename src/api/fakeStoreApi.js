import axios from 'axios';

// Create an Axios instance with a base URL and default headers
const fakeStoreApi = axios.create({
  baseURL: 'https://fakestoreapi.com', // The base URL for the Fake Store API
  headers: {
    'Content-Type': 'application/json', // Standard header for JSON requests
  },
  timeout: 10000, // 10 seconds timeout for requests to prevent indefinite waits
});

// Add a response interceptor to handle errors globally
// This helps in centralizing error logging or displaying messages
fakeStoreApi.interceptors.response.use(
  (response) => {
    // If the response is successful (status code 2xx), simply return it
    return response;
  },
  (error) => {
    // If an error occurs, log it to the console for debugging
    console.error('API Error:', error.response || error.message);
    // You could implement global user-facing error notifications here (e.g., a toast/snackbar)
    // For example: snackbarRef.current.show('An API error occurred!', 'error');
    // Re-throw the error so that individual components can still catch and handle it if needed
    return Promise.reject(error);
  }
);

// Define specific API call functions for products and categories
// Ensure these functions are explicitly exported
export const getProducts = () => fakeStoreApi.get('/products');
export const getProductById = (id) => fakeStoreApi.get(`/products/${id}`);
export const getCategories = () => fakeStoreApi.get('/products/categories');

// Export the Axios instance itself if needed elsewhere (though not strictly necessary for this app)
export default fakeStoreApi;
