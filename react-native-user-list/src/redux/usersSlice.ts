import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, UsersState } from './usersTypes';
import { fetchUsersApi } from '../services/usersApi';
import { saveUsersToStorage, loadUsersFromStorage } from '../services/usersStorage';
import { transformUserAddress } from '../utils/transformUserAddress';

const initialState: UsersState = {
  users: [],
  visibleCount: 5,
  loading: false,
  error: null,
  searchQuery: '',
};

/**
 * fetch all users from API
 */
export const fetchUsersThunk = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const rawUsers = await fetchUsersApi();
      
      const transformedUsers: User[] = rawUsers.map((u: any) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        address: transformUserAddress(u.address),
      }));
      
      await saveUsersToStorage(transformedUsers);
      
      return transformedUsers;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch users');
    }
  }
);

/**
 * load users from cache
 */
export const loadCachedUsersThunk = createAsyncThunk(
  'users/loadCachedUsers',
  async (_, { rejectWithValue }) => {
    try {
      const cachedUsers = await loadUsersFromStorage();
      if (cachedUsers) return cachedUsers;
      return rejectWithValue('No cache found');
    } catch (error) {
      return rejectWithValue('Failed to load cache');
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    increaseVisibleCount: (state) => {
      state.visibleCount = Math.min(state.visibleCount + 5, state.users.length);
    },
    resetVisibleCount: (state) => {
      state.visibleCount = 5;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loadCachedUsersThunk.fulfilled, (state, action) => {
        state.users = action.payload;
      });
  },
});

export const { setSearchQuery, increaseVisibleCount, resetVisibleCount } = usersSlice.actions;
export default usersSlice.reducer;
