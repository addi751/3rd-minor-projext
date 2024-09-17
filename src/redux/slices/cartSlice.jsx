import { createSlice } from '@reduxjs/toolkit';

// Define initial state
const initialState = {
  items: [], // Ensure items include a quantity property
  totalAmount: 0,
};

// Create the slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if item already exists
      } else {
        state.items.push({ ...action.payload, quantity: 1 }); // Add item with quantity 1
      }
      state.totalAmount += action.payload.price;
    },
    removeFromCart: (state, action) => {
      const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (itemIndex !== -1) {
        state.totalAmount -= state.items[itemIndex].price * state.items[itemIndex].quantity;
        state.items.splice(itemIndex, 1);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
    updateCartItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        state.totalAmount -= existingItem.price * existingItem.quantity; // Remove old quantity amount
        existingItem.quantity = quantity;
        state.totalAmount += existingItem.price * quantity; // Add new quantity amount

        if (existingItem.quantity <= 0) {
          state.items = state.items.filter(item => item.id !== id); // Remove item if quantity is 0
        }
      }
    },
  },
});

// Export the actions
export const { addToCart, removeFromCart, clearCart, updateCartItemQuantity } = cartSlice.actions;

// Export the reducer
export default cartSlice.reducer;
