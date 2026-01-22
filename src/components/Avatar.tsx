import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';

const AppAvatar = ({ initials, image, size = 56, style }) => {
  if (image) {
    return (
      <Avatar.Image
        size={size}
        source={{ uri: image }}
        style={[styles.avatar, style]}
      />
    );
  }

  return (
    <Avatar.Text
      size={size}
      label={initials}
      style={[styles.avatar, style]}
      color="#1E88E5"
    />
  );
};

export default AppAvatar;

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: '#E8F4FF',
    borderWidth: 1,
    borderColor: '#cfeaff',
  },
});
