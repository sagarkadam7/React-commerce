import React, { createContext, useReducer, useContext, useEffect } from 'react';

// 1. Define initial state for the cart
const initialCartState = {
  items: [], // Array of products in the cart, each with an added 'quantity' property
  totalQuantity: 0, // Total number of individual items in the cart
  totalPrice: 0,    // Sum of prices of all items (price * quantity)
};

// 2. Define the reducer function
// This function determines how the state changes in response to actions
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const productToAdd = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === productToAdd.id);

      let updatedItems;
      if (existingItemIndex > -1) {
        // Item already exists, increment quantity
        updatedItems = [...state.items];
        const existingItem = updatedItems[existingItemIndex];
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
      } else {
        // New item, add to cart with quantity 1
        updatedItems = [...state.items, { ...productToAdd, quantity: 1 }];
      }

      // Recalculate total quantity and price for the entire cart
      const newTotalQuantity = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const newTotalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      return {
        ...state,
        items: updatedItems,
        totalQuantity: newTotalQuantity,
        totalPrice: newTotalPrice,
      };
    }

    case 'REMOVE_ITEM': {
      const idToRemove = action.payload;
      const itemToRemove = state.items.find(item => item.id === idToRemove);

      if (!itemToRemove) return state; // Should not happen if UI is correct

      const updatedItems = state.items.filter(item => item.id !== idToRemove);

      // Recalculate totals
      const newTotalQuantity = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const newTotalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      return {
        ...state,
        items: updatedItems,
        totalQuantity: newTotalQuantity,
        totalPrice: newTotalPrice,
      };
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload; // New desired quantity
      const itemIndex = state.items.findIndex(item => item.id === id);

      if (itemIndex === -1) return state; // Item not found

      let updatedItems = [...state.items];
      const existingItem = updatedItems[itemIndex];

      if (quantity <= 0) {
        // If quantity is 0 or less, remove the item completely
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: id });
      }

      // Update the quantity for the specific item
      updatedItems[itemIndex] = { ...existingItem, quantity: quantity };

      // Recalculate totals
      const newTotalQuantity = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const newTotalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      return {
        ...state,
        items: updatedItems,
        totalQuantity: newTotalQuantity,
        totalPrice: newTotalPrice,
      };
    }

    case 'CLEAR_CART':
      // Reset to initial empty state
      return initialCartState;

    case 'SET_CART': // Used for loading cart from local storage on app start
      return action.payload;

    default:
      // If an unknown action type is dispatched, return current state
      console.warn(`Unhandled action type: ${action.type}`);
      return state;
  }
};

// 3. Create the Cart Context
const CartContext = createContext();

// 4. Create the Cart Provider Component
// This component wraps around parts of your app that need access to cart state
export const CartProvider = ({ children }) => {
  // useReducer hook: manages state using the reducer function
  // The third argument (a function) is an initializer, for loading from localStorage
  const [cartState, dispatch] = useReducer(cartReducer, initialCartState, (initial) => {
    try {
      const storedCart = localStorage.getItem('cart');
      // If a cart exists in localStorage, parse it; otherwise, use the initial state
      return storedCart ? JSON.parse(storedCart) : initial;
    } catch (error) {
      // Handle potential parsing errors if localStorage content is corrupt
      console.error("Failed to load cart from localStorage", error);
      return initial; // Fallback to initial state on error
    }
  });

  // 5. Persist cart state to localStorage whenever it changes (useEffect)
  // This hook runs side effects (like saving to localStorage) after rendering
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartState));
    } catch (error) {
      console.error("Failed to save cart to localStorage", error);
    }
  }, [cartState]); // Dependency array: runs when cartState changes

  // 6. Define action dispatch functions
  // These are the public API of your cart context, making it easy to interact with
  const addItem = (product) => dispatch({ type: 'ADD_ITEM', payload: product });
  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const updateQuantity = (id, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  // The value provided by the context to its consumers
  return (
    <CartContext.Provider
      value={{
        cartItems: cartState.items,
        totalQuantity: cartState.totalQuantity,
        totalPrice: cartState.totalPrice,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 7. Custom Hook to easily consume the Cart Context
// This makes it cleaner to use the cart state and actions in components
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    // This check ensures useCart is only called within a CartProvider
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};