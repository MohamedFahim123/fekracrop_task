import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../redux/usersTypes';

const USERS_STORAGE_KEY = '@users_storage';

/**
 * Saves full users array to AsyncStorage
 */
export const saveUsersToStorage = async (users: User[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(users);
    await AsyncStorage.setItem(USERS_STORAGE_KEY, jsonValue);
  } catch (error) {
    console.error('Error saving users:', error);
  }
};

/**
 * Loads users from AsyncStorage
 */
export const loadUsersFromStorage = async (): Promise<User[] | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(USERS_STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error loading users:', error);
    return null;
  }
};
