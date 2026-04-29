import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { styles } from './LoadingState.styles';

interface LoadingStateProps {
  message?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Loading...' }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007AFF" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default LoadingState;
