import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const StudifyLogo = ({
  source,       // image source (require ou uri)
  size = 120,   // taille personnalisable
  style,        // style externe
  resizeMode = 'contain', // mode d’affichage
}) => {
  return (
    <View style={[styles.container, style]}>
      <Image
        source={source}
        style={{ width: size, height: size, resizeMode }}
      />
    </View>
  );
};

export default StudifyLogo;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
