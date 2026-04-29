import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { 
  fetchUsersThunk, 
  loadCachedUsersThunk, 
  setSearchQuery, 
  increaseVisibleCount 
} from '../redux/usersSlice';
import { 
  selectFilteredUsers, 
  selectUsersLoading, 
  selectUsersError, 
  selectCanLoadMore, 
  selectSearchQuery,
  selectUsers
} from '../redux/usersSelectors';

export const useUsers = () => {
  const dispatch = useAppDispatch();
  const allUsers = useAppSelector(selectUsers);
  const users = useAppSelector(selectFilteredUsers);
  const loading = useAppSelector(selectUsersLoading);
  const error = useAppSelector(selectUsersError);
  const canLoadMore = useAppSelector(selectCanLoadMore);
  const searchQuery = useAppSelector(selectSearchQuery);

  useEffect(() => {
    const initData = async () => {
      const resultAction = await dispatch(loadCachedUsersThunk());
      
      if (loadCachedUsersThunk.rejected.match(resultAction) || 
          (loadCachedUsersThunk.fulfilled.match(resultAction) && resultAction.payload.length === 0)) {
        dispatch(fetchUsersThunk());
      }
    };
    initData();
  }, [dispatch]);

  const handleSearch = useCallback((text: string) => {
    dispatch(setSearchQuery(text));
  }, [dispatch]);

  const handleLoadMore = useCallback(() => {
    dispatch(increaseVisibleCount());
  }, [dispatch]);

  const handleRetry = useCallback(() => {
    dispatch(fetchUsersThunk());
  }, [dispatch]);

  return {
    users,
    loading,
    error,
    canLoadMore,
    searchQuery,
    handleSearch,
    handleLoadMore,
    handleRetry,
  };
};
