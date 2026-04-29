import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  addressContainer: {
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingTop: 8,
  },
  addressLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
    marginBottom: 2,
  },
  addressText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
});
