import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';
import { User } from './usersTypes';

const selectUsersState = (state: RootState) => state.users;

export const selectUsers = createSelector(
  [selectUsersState],
  (usersState) => usersState.users
);

export const selectVisibleCount = createSelector(
  [selectUsersState],
  (usersState) => usersState.visibleCount
);

export const selectSearchQuery = createSelector(
  [selectUsersState],
  (usersState) => usersState.searchQuery
);

export const selectVisibleUsers = createSelector(
  [selectUsers, selectVisibleCount],
  (users, visibleCount) => users.slice(0, visibleCount)
);

export const selectFilteredUsers = createSelector(
  [selectVisibleUsers, selectSearchQuery],
  (visibleUsers, query) => {
    const trimmedQuery = query.trim().toLowerCase();
    if (!trimmedQuery) return visibleUsers;
    
    return visibleUsers.filter((user: User) => 
      user.name.toLowerCase().includes(trimmedQuery)
    );
  }
);

export const selectCanLoadMore = createSelector(
  [selectUsers, selectVisibleCount],
  (users, visibleCount) => visibleCount < users.length
);

export const selectUsersLoading = createSelector(
  [selectUsersState],
  (usersState) => usersState.loading
);

export const selectUsersError = createSelector(
  [selectUsersState],
  (usersState) => usersState.error
);
