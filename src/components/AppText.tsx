import React from 'react';
import { Text, StyleSheet } from 'react-native';

const AppText = ({
  text,
  type = 'default',
  style,
  numberOfLines,   // permet de couper un texte long
  ellipsizeMode,   // 'tail', 'middle', 'head'
}) => {
  return (
    <Text
      style={[styles[type], style]}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
    >
      {text}
    </Text>
  );
};

export default AppText;

const styles = StyleSheet.create({
  default: {
    fontSize: 18,
    color: '#334155',
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#0B59A7',
  },
  header: {
    fontSize: 36,
    fontWeight: '700',
    color: '#ffffff',
  },
  name: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
  },
  email: {
    fontSize: 18,
    color: '#6b7280',
  },
  subtitle: {
    fontSize: 18,
    color: '#9AA9C9',
  },
  link: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E88E5',
  },
  logout: {
    fontSize: 22,
    fontWeight: '700',
    color: '#D32F2F',
  },
  button: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
  },
});

