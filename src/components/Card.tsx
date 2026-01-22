import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = ({ style, children }) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e6eefb',
    padding: 16,
    marginVertical: 8,
  },
});
