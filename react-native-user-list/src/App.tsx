import React, { useCallback } from 'react';
import { 
  Text, 
  View, 
  FlatList, 
  TouchableOpacity, 
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { useUsers } from './hooks/useUsers';
import UserCard from './components/UserCard/UserCard';
import SearchBar from './components/SearchBar/SearchBar';
import EmptyState from './components/EmptyState/EmptyState';
import LoadingState from './components/LoadingState/LoadingState';
import ErrorState from './components/ErrorState/ErrorState';
import { styles } from './App.styles';

const UserListContent = () => {
  const {
    users,
    loading,
    error,
    canLoadMore,
    searchQuery,
    handleSearch,
    handleLoadMore,
    handleRetry,
  } = useUsers();

  const renderItem = useCallback(({ item }: { item: any }) => (
    <UserCard user={item} />
  ), []);

  const keyExtractor = useCallback((item: any) => item.id.toString(), []);

  const renderFooter = () => {
    if (!canLoadMore) {
      return (
        <View style={styles.footer}>
          {users.length > 0 && <Text style={styles.loadMoreText}>No more users</Text>}
        </View>
      );
    }
    
    return (
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.loadMoreButton} 
          onPress={handleLoadMore}
        >
          <Text style={styles.loadMoreText}>Load More</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderEmpty = () => {
    if (loading) return null;
    return <EmptyState message={searchQuery ? "No users match your search" : "No users found"} />;
  };

  if (loading && users.length === 0) {
    return <LoadingState message="Fetching users..." />;
  }

  if (error && users.length === 0) {
    return <ErrorState message={error} onRetry={handleRetry} />;
  }

  return (
    <View style={styles.content}>
      <SearchBar value={searchQuery} onChangeText={handleSearch} />
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={5}
        removeClippedSubviews={true}
      />
    </View>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>User Directory</Text>
          </View>
          <UserListContent />
          <StatusBar style="dark" />
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}
