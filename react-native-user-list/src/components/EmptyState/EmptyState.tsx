import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './EmptyState.styles';

interface EmptyStateProps {
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default EmptyState;
