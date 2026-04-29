import React from 'react';
import { View, TextInput } from 'react-native';
import { styles } from './SearchBar.styles';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search users by name"
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
};

export default SearchBar;
