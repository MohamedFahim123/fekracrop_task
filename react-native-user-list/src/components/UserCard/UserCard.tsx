import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { User } from '../../redux/usersTypes';
import { styles } from './UserCard.styles';

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <View style={styles.addressContainer}>
        <Text style={styles.addressLabel}>Address:</Text>
        <Text style={styles.addressText}>{user.address}</Text>
      </View>
    </View>
  );
};

export default memo(UserCard);
