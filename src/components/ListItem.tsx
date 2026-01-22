import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Divider from './Divider'; // composant séparé pour les séparateurs

const ListItem = ({
  icon,
  label,
  subtitle,
  onPress,
  iconColor = '#1E88E5',
  showDivider = false,
  arrow = false, // nouvelle prop
}) => {
  return (
    <>
      <TouchableOpacity style={styles.item} onPress={onPress}>
        <View style={styles.iconBox}>
          <Text style={[styles.iconText, { color: iconColor }]}>{icon}</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.label}>{label}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>

        {arrow && <Text style={styles.arrow}>›</Text>}
      </TouchableOpacity>

      {showDivider && <Divider />}
    </>
  );
};

export default ListItem;
const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 96,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  iconBox: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: '#F3F8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 28,
    fontWeight: '700',
  },
  textContainer: {
    flex: 1,
    marginLeft: 20,
  },
  label: {
    fontSize: 22,
    color: '#334155',
  },
  subtitle: {
    fontSize: 18,
    color: '#9AA9C9',
  },
  arrow: {
    fontSize: 28,
    color: '#9AA9C9',
  },
});
