import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const AppLink = ({ text, onPress, style, textStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={style}>
      <Text style={[styles.linkText, textStyle]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default AppLink;

const styles = StyleSheet.create({
  linkText: {
    fontSize: 15,
    color: '#1E88E5',
    fontWeight: '600',
  },
});
