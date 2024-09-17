import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Simulate fetching users from an API
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  return [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ];
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: []
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    removeUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  }
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
