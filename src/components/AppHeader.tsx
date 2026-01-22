import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AppHeader = ({
  title,
  leftIcon = 'arrow-back',   // par défaut flèche retour
  onLeftPress,
  rightIcon,                  // optionnel (menu, settings, etc.)
  onRightPress,
  style,
  titleStyle,
}) => {
  return (
    <View style={[styles.header, style]}>
      {/* Icône gauche */}
      {leftIcon && (
        <TouchableOpacity onPress={onLeftPress} style={styles.iconBox}>
          <Ionicons name={leftIcon} size={26} color="#ffffff" />
        </TouchableOpacity>
      )}

      {/* Titre */}
      <Text style={[styles.title, titleStyle]}>{title}</Text>

      {/* Icône droite */}
      {rightIcon && (
        <TouchableOpacity onPress={onRightPress} style={styles.iconBox}>
          <Ionicons name={rightIcon} size={26} color="#ffffff" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#1E88E5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  iconBox: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
});
