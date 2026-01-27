import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';

const AppAvatar = ({ initials = 'NN', image, size = 56, style }) => {
  const [failed, setFailed] = React.useState(false);

  // Si on a une image valide et que le chargement n'a pas échoué, afficher l'image
  if (image && !failed) {
    return (
      <Avatar.Image
        size={size}
        source={{ uri: image }}
        style={[styles.avatar, style]}
        // onError est utile pour basculer sur le fallback (initiales) si l'URI ne charge pas
        onError={() => setFailed(true)}
      />
    );
  }

  // Sinon afficher les initiales
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